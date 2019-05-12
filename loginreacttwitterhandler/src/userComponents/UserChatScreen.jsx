import React,{ useState, useEffect } from 'react';
import { sendDirectMessage } from '../components/TwitterApis'

export default function UserChatScreen(props){

	 let [currentTweetToSent, setCurrentTweetToSent] = useState('');
	 let [entityList, setEntityList] = useState([]);


	 useEffect(()=>{
	 	const {entityList:originalEntityList} = props;
	 	setEntityList(originalEntityList.slice(0).reverse());
	 	// eslint-disable-next-line react-hooks/exhaustive-deps 
	 },[]);

	const {userData:recipientData, userInfo } = props;
	const {user:{profile_image_url}={}, user:{id_str:recipientId} }=recipientData;

	const {id_str:currentUserId, profile_image_url_https:userImage} = JSON.parse(userInfo);

	const tweetChange=(e)=>{
		setCurrentTweetToSent(e.target.value);
	};

	const postTweet=async()=>{

		const {userData:{user:{id_str}}} = props;
		const message_data={text:currentTweetToSent};
		const request = {event:{type:"message_create", message_create:{target:{recipient_id:parseInt(id_str)}, message_data}}}
		const config = {access_token:sessionStorage.getItem('access_token'),access_token_secret:sessionStorage.getItem('access_token_secret')};
		props.setFocusAndClear();
		const data =await sendDirectMessage({config, request});
		const {event} = data;
		let entityListChanged = [...entityList];
		entityListChanged.push(event);

		setEntityList(entityListChanged);
	}
	const filteredEntityList = entityList.filter(({message_create:{target:{recipient_id}, sender_id}})=>recipient_id===recipientId || sender_id===recipientId )
	return(
		<section id="chat-screen">
		<div className="messagelist">
		{filteredEntityList.length ?
						filteredEntityList.map(({message_create:{message_data:{text}={}, target:{recipient_id}={}}={} })=>

							<section className={`messages ${recipient_id===currentUserId?'right':'left'}`}>
								<article>
									<div className="avatar">
										<img src={`${recipient_id===currentUserId?profile_image_url:userImage}`} alt=""/>
									</div>
									<div className={`msg ${recipient_id===currentUserId?'right':'left'}`}>
										<div className="pointer"></div>
										<div className="inner-msg">
											<p>{text}</p>	
											</div>
									</div>
								</article>
							</section>
							):null}
		</div>
		<div className="msg-compose">
								<i className="fa fa-paperclip"></i>
								<textarea placeholder="Say something..." ref={(ip) => props.setMyInp(ip)}  onKeyDown=
								{(e)=>{
									if(e.keyCode===13)
										{
											postTweet();}
								}
						} 
						onChange={tweetChange}></textarea>
								<i className="fab fa-telegram-plane"  onClick={postTweet}></i>
							</div>
		</section>
		)
}