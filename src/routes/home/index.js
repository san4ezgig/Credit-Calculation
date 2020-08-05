import { h } from 'preact';
import style from './style';
import currency from 'currency.js';
import { useState, useCallback, useEffect } from 'preact/hooks';
import useBooleanState from '../../hooks/useBooleanState';
import ModalForm from '../../components/modalForm';
import { storageKeys, storage } from '../../storage';

const Home = () => {
	const [isLoading, setIsLoading] = useState(false);
	const storageData = storage.getItem(storageKeys.moneyData);
	const [formData, setFormData] = useState(storageData);
	const [viewData, setViewData] = useState(null);
  const [isModalOpen, setModalOpen, setModalClose] = useBooleanState(!storageData);
	const [error, setError] = useState('');
	const getRateData = useCallback(async (sum, loanDate) => {
		setIsLoading(true);

		try {
			const [firstResp, secondResp] = await Promise.all([
				fetch('https://www.nbrb.by/api/exrates/rates/USD?parammode=2'),
				fetch(`https://www.nbrb.by/api/exrates/rates/USD?parammode=2&ondate=${loanDate}`),
			]);
			const [{Cur_OfficialRate: rateForNow}, {Cur_OfficialRate: rateForOldDate}] = await Promise.all([
				firstResp.json(),
				secondResp.json(),
			]);
			setViewData({
				belSum: sum,
				oldUsdSum: currency(sum).divide(rateForOldDate).format(),
				newUsdSum: currency(sum).divide(rateForNow).format(),
			});
			storage.setItem(storageKeys.moneyData, {
				sum, loanDate,
			})
		} catch (e) {
			setError('Что-то пошло не так, идите в жопу')
		}
		setIsLoading(false);
	}, []);

	useEffect(() => {
		if (formData) {
			const {sum, loanDate} = formData;
			getRateData(sum, loanDate);
		}
	}, [formData]);
	
	const handleFormSubmit = useCallback(async (sum, loanDate) => {
		setModalClose();
		setFormData({
			sum, loanDate,
		})
	}, []);
	const { belSum, oldUsdSum, newUsdSum } = viewData || {};

	return (
		<div class={style.home}>
			<div class={style.error}>
				{error}
			</div>
			{viewData && <div class={style.contentContainer}>
				<div>
					Сумма кредита - {belSum} белорусских рублей
				</div>
				<div>
					{oldUsdSum} сумма в долларах на момент взятия кредита
				</div>
				<div>
					{newUsdSum} сумма в долларах на сегодня
				</div>
				<button onClick={setModalOpen}>
					Изменить данные
				</button>
			</div>}
			
			<ModalForm handleFormSubmit={handleFormSubmit} isModalOpen={isModalOpen} data={formData} setModalClose={setModalClose} />
		</div>
)};

export default Home;
