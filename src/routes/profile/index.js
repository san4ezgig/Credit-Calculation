import style from './style';
import FormBuilder from '../../components/formBuilder';
import Modal from '../../components/modal';
import useBooleanState from '../../hooks/useBooleanState';
import CreditTable from './CreditTable';
import { useState, useCallback } from 'preact/hooks';

const Profile = () => {
	const [isModalOpen, setModalOpen, setModalClose] = useBooleanState(true);
	const [tableData, setTableData] = useState(null);

	const handleFormSubmit = useCallback((data) => {
		setTableData(data);
		setModalClose();
	}, []);

	return (
		<div class={style.profile}>
			{!!tableData && <CreditTable data={tableData} />}

			<Modal isOpen={isModalOpen} handleClose={setModalClose}>
				<FormBuilder
					initialState={{
						amount: 1,
						mainPercent: 1,
						years: 20,
						creditType: 0,
						loanDate: '2020-02-02',
					}}
					onSubmit={handleFormSubmit}
				>
					{({ handleChange, values, onSubmit }) => (
						<div class={style.form} >
							<div>
								<label>Сумма кредита в белорусских рублях</label>
								<input onInput={handleChange} name="amount" type="number" value={values.amount} />
							</div>
							<div>
								<label>
									Годовой процент
								</label>
								<input onInput={handleChange} type="number" step="0.01" name="mainPercent" value={values.mainPercent} />
							</div>
							<div>
								<label>
									На сколько лет кредит
								</label>
								<input onInput={handleChange} type="number" name="years" value={values.years} />
							</div>
							<div>
								<label>
									Тип выплаты
								</label>
								<select onChange={handleChange} name="creditType" value={values.creditType}>
									<option value={0}>Аннуитет</option>
								</select>
							</div>
							<label>
								Дата взятия кредита
							</label>
							<input onInput={handleChange} name="loanDate" value={values.loanDate} type="date" placeholder="Дата взятия кредита"/>
							<div class={style.buttons}>
								<button onClick={setModalClose} >
									Cancel
								</button>
								<button type="submit">
									Save
								</button>
							</div>
						</div>
					)}
				</FormBuilder>
			</Modal>
		</div>
	);
}

export default Profile;