// import React from 'react';
// import { GoogleLogin } from 'react-google-login';

// import { Bar } from './Bar';

// export class HomePage extends React.Component {
//     constructor() {
//         super();
//         this.logout = this.logout.bind(this);
//     }

//     logout() {
//         localStorage.removeItem('user');
//         window.location.href = '/';
//     }
//     render() {
//         const user = JSON.parse(localStorage.getItem('user'));
//         console.log("Logged in as : ", user);
//         return (
//             <div>       
//                 <Bar />         
//                 <h1> Welcome { user.username } </h1>
//                 {/* <img src={ user.imageUrl } alt="sorry" /> */}
//                 <div>{ user.email }</div>
//                 <div style={{'visibility': 'hidden'}}>
//                  <GoogleLogin
//                                 clientId="721651622664-51vqgt9jtq7ef8nc5hjr653ascd4ld7b.apps.googleusercontent.com"
//                                 buttonText="Login"
//                                 onSuccess={ this.responseGoogle }
//                                 onFailure={ this.responseGoogle }
//                             />
//                 </div>
//             </div>
//         );
//     }
// }
