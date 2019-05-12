import axios from 'axios'

export const register = newUser => {
    return axios
        .post('users/register', {   
            email: newUser.email,
            password: newUser.password,
        }).then(res => {
            return res.data;
        })
}
    
export const login = user => {
    return axios
        .post('users/login', {
            email: user.email,
            password: user.password
        })
        .then(res => {
            if(!res.data.error)
            {localStorage.setItem('usertoken', res.data)
            }
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}


export const statuses = req => {
    return axios
        .post('users/statuses/home_timelines', req)
        .then(res => {
            return JSON.parse(res.data);
        })
        .catch(err => {
            console.log(err)
        })
}



export const requestToken =  () =>{
    return axios.get('users/twitter/oauth/request_token').then(res => {
            return res.data;
        })
}

export const accessToken =  oauth =>{
    return axios.post('users/twitter/oauth/access_token', oauth).then(res => {
            return res.data;
        });
}

export const directMessageEventList = req=>{
    return axios.post('users/direct_messages/eventlist', req).then(res => {
            return JSON.parse(res.data);;
        });
}



export const verifyCredentials=  (config) =>{
    return axios.post('users/twitter/verifycredentials', config).then(res => {  
            if(res.error){
                console.log(res.error);
                return;
            }
            return res.data;
        });
}


export const sendDirectMessages=  (data) =>{
    return axios.post('users/direct_messages/send', data).then(res => {  
            if(res.error){
                console.log(res.error);
                return;
            }
            return res.data;
        });
}