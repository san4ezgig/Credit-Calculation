import { h } from 'preact';
import style from './style';
import currency from 'currency.js';
import { useState, useCallback } from 'preact/hooks';
import ModalForm from '../../components/modalForm';

const Home = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(true);
	const [error, setError] = useState('');
	const handleFormSubmit = useCallback(async (sum, loanDate) => {
		setIsLoading(true);
		setIsModalOpen(false);

		try {
			const [firstResp, secondResp] = await Promise.all([
				fetch('https://www.nbrb.by/api/exrates/rates/USD?parammode=2'),
				fetch(`https://www.nbrb.by/api/exrates/rates/USD?parammode=2&ondate=${loanDate}`),
			]);
			const [{Cur_OfficialRate: rateForNow}, {Cur_OfficialRate: rateForOldDate}] = await Promise.all([
				firstResp.json(),
				secondResp.json(),
			]);
			setData({
				belSum: sum,
				oldUsdSum: currency(sum).divide(rateForOldDate).format(),
				newUsdSum: currency(sum).divide(rateForNow).format(),
			});
		} catch (e) {
			setError('Что-то пошло не так, идите в жопу')
		}
		setIsLoading(false);
	}, []);
	const { belSum, oldUsdSum, newUsdSum } = data || {};

	return (
		<div class={style.home}>
			<div class={style.error}>
				{error}
			</div>
			{data && <div>
				<div>
					{belSum} белорусских рублей
				</div>
				<div>
					{oldUsdSum} сумма в долларах на момент взятия кредита
				</div>
				<div>
					{newUsdSum} сумма в долларах на сегодня
				</div>
			</div>}
			
			<ModalForm handleFormSubmit={handleFormSubmit} isModalOpen={isModalOpen} data={data} />
		</div>
)};

export default Home;
