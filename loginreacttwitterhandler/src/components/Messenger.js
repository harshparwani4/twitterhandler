import React, {Component} from 'react';
import '../css/styles.css'
import { getRequestToken, getAccessToken, verifyCred, getStatus, directMessage } from './TwitterApis'
import UserCard from '../userComponents/UserCard'
import UserChatScreen from '../userComponents/UserChatScreen'
import InfiniteScroll from 'react-infinite-scroll-component'



let myInp=null;

class Messenger extends Component{
		constructor(props){
			super(props);

			this.state={
				data:[],
				currentData:null,
				currentTweetToSent:'',
				userInfo:{},
			}
		}



	async componentDidMount(){

		let data='';

		if(window.location.href.includes('oauth_verifier')){
				const urlParams = window.location.href.split('?')[1];
				const [oauth_token, oauth_verifier] = urlParams.split('&').map(eachData=>eachData.split('=')[1]);
				const oauth = {token:oauth_token, verifier:oauth_verifier, token_secret:localStorage.secret_token};

				data =await getAccessToken(oauth);
				const {access_token:accessToken, access_token_secret:accessTokenSecret} =data || {};
				if(data)
				{


					const config={accessToken, accessTokenSecret};
					sessionStorage.setItem('access_token',accessToken);
					sessionStorage.setItem('access_token_secret', accessTokenSecret);
					const userInfo= await verifyCred(config)
					console.log('userInfo', userInfo);

					let directMessageList = await directMessage({count:10});

					const {events=[]}=directMessageList;
					let status = await getStatus({count:10, exclude_replies:true, include_entities:false});
						
					this.setState({
						data:status,
						currentData:status[0],
						entity:events,
						userInfo,
					})

					
		}

		else{
			window.location.replace('/messenger');
		}

		}
		else{

		data =await getRequestToken();
		window.location.replace('https://api.twitter.com/oauth/authorize?oauth_token='+data.token);
}
}	

	getCurrentSelectedData=(data)=>{

	myInp.focus();
		
		this.setState({
			currentData:data
		});
	}


	fetchData = async () =>{
		const {data:originalData}=this.state;
		const data=await getStatus({count:3, exclude_replies:true, include_entities:false});
		this.setState({
			data:originalData.concat(data)
		})
	}

	setMyInp = (data) =>{
		myInp=data;
	}

	setFocusAndClear=()=>{
		myInp.focus();
		myInp.value='';
	}
	cardsArray =()=>{

			const {data:originalData=[]} =this.state;
			const {DataAcc:modifiedData} = originalData.reduce((acc, eachData)=>{
				const {user:{ name}} =eachData;

				if(!acc['uniqueName'] && !acc['DataAcc'])
				{
					acc['uniqueName']={};
					acc['DataAcc']=[];
				}

				const uniqueNameObj =  acc['uniqueName'];
				const DataAcc = acc['DataAcc'];
				if(uniqueNameObj[name]===undefined){
				uniqueNameObj[name]=1;
				console.log('name',name);
				DataAcc.push(eachData);
			}
				return {...acc, uniqueName:uniqueNameObj, DataAcc};
			},{});

			console.log('modifiedData',modifiedData);
		 


		return	modifiedData.map(userData => (
    			
					<UserCard onCardClick={this.getCurrentSelectedData} userData={userData} />
					
  ))}

	render(){

		const {data, currentData = {}, entity, userInfo}=this.state;
		return (
				data.length?(<div id="wrapperMessenger">
					<div className="appContainerMessenger">

					<aside className="users">
					<header>
							<h2>Messages</h2>
						</header>
    			
						<InfiniteScroll
							
							dataLength={10}
							next={this.fetchData}
  							hasMore={true}
  							endMessage={
    <p style={{textAlign: 'center'}}>
      <b>Yay! You have seen it all</b>
    </p>
  }
						>
						<ul>
					{this.cardsArray()}
					</ul>
					</InfiniteScroll>
					</aside>

					<UserChatScreen entityList={entity} myInp={myInp} userInfo={userInfo} setFocusAndClear={this.setFocusAndClear} userData={currentData} setMyInp={this.setMyInp}/>
					
					</div>	
				</div>):(<div>Loading</div>)
			)
	}
}

export default Messenger;