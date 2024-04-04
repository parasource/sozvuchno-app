import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { auth } from '../services/index.js';
import { Button } from 'shared/button/button';

export const VerifyPage = () => {
	let { token } = useParams();
	const navigate = useNavigate();
	const [verified, setVerified] = useState(null)

	const verify = () => {
		if(token){
			auth.verifyEmail(token).then(res => {
				if(res.data.success){
					setVerified('yes')
					navigate('/login')
				}
			}).catch(() => setVerified('no'))
		}
	}


	return (
		<div className='container'>
			<br />
			<br />
			<h2>{verified ? {'yes': 'Ваша почта подтверждена', 'no': 'Ваша почта не подтверждена'}[verified] : 'Нажмите для подтверждения почты'}</h2>
			<br />
			<Button label={'Подтвердить'} onClick={verify} disabled={verified === 'yes'}/>
		</div>
	)
}
