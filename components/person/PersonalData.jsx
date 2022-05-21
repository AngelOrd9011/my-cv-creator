import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { ProfilePicture } from './ProfilePicture';

const PersonalData = (props) => {
	const [person, setPerson] = useState({ ...props?.person });
	return (
		<>
			<Card className="info-card">
				<div className="grid">
					<div className="col-12 md:col-12 lg:col-3 ">
						<ProfilePicture picture={person?.picturebase64} picture_type={person?.picture_type} email={person?.email} alerts={props?.alerts} />
					</div>
					<div className="col-12 md:col-12 lg:col-9">
						<div className="grid">
							<div className="p-field col-12 md:col-6 lg:col-4">
								<span className="p-float-label">
									<InputText id="name" className="p-inputtext-lg" value={person.name} />
									<label htmlFor="name">Nombre(s)</label>
								</span>
							</div>
							<div className="p-field col-12 md:col-6 lg:col-4">
								<span className="p-float-label">
									<InputText id="last_name" className="p-inputtext-lg" value={person.last_name} />
									<label htmlFor="last_name">Apellidos</label>
								</span>
							</div>
							<div className="p-field col-12 md:col-6 lg:col-4">
								<span className="p-float-label">
									<InputText id="email" className="p-inputtext-lg" value={person.email} />
									<label htmlFor="email">E-mail</label>
								</span>
							</div>
						</div>
					</div>
				</div>
			</Card>
		</>
	);
};
export default PersonalData;
