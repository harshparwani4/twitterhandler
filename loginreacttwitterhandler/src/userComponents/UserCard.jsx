import React from 'react';
import moment from 'moment';

export default function UserCard(props){

	// let [showModal, setShowModal] = useState(false);

	const {userData} = props;
	const {user:{profile_image_url, name}={}, text, created_at }=userData;


	return(
		<div>
		{name?(<div onClick={()=>props.onCardClick(userData)} style={{cursor:'pointer',padding:"5px"}}>
		
						
							<li>
								<div className="avatar top">
									<img src={profile_image_url} alt=""/>
									<div className="online"></div>
								</div>
								<div className="users-list">
									<div className="username">
										<p>{name}</p>
									</div>
									<div className="text">
										<p>{text}</p>
									</div>
								</div>
								<div className="timestamp">
									<p>{moment(created_at).format("h:mm a")}</p>
								</div>
							</li>
						
		</div>):null}
		</div>
		)
}