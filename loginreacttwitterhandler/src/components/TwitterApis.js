import { statuses, requestToken, accessToken, verifyCredentials, directMessageEventList, sendDirectMessages } from './UserFunctions';


    

export const getStatus= (req)=> {
        const response=statuses(req);
        console.log('response',response)
        return response;
        }

 export const getRequestToken = ()=>{
		return requestToken();
 }


  export const getAccessToken = (oauth)=>{
		return accessToken(oauth);
 }


  export const verifyCred = (data)=>{
		return verifyCredentials(data);
 }

 export const directMessage = (data)=>{
		return directMessageEventList(data);
 }

export const sendDirectMessage = (data)=>{
		return sendDirectMessages(data);
 }