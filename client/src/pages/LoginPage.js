import React, {useCallback, useState, useEffect} from 'react'
import { User } from './user.js'
import {LoginSocialFacebook, LoginSocialTwitter} from 'reactjs-social-login'
import {FacebookLoginButton, TwitterLoginButton} from 'react-social-login-buttons'
import dotenv from 'dotenv'
import HomePage from './HomePage';
import {Redirect} from 'react-router-dom';


dotenv.config();
const REDIRECT_URI = '/';

const Login = () => {
    const [provider, setProvider] = useState('')
    const [profile, setProfile] = useState(null)
    const [redir, setRedir] = useState(false)
    
    const onLoginStart = useCallback(() => {
      alert('login start')
    }, [])
  
    const onLogoutSuccess = useCallback(() => {
      setProfile(null)
      setProvider('')
      alert('logout success')
    }, [])
        return (
            <>
        {provider && profile ? (
            <User provider={provider} profile={profile} onLogout={onLogoutSuccess} />
        ) : (
            <div className={`App ${provider && profile ? 'hide' : ''}`}>
            <h1 className='title'>Spotify 2.0 Login</h1>
            <h2>Please select from a login method below</h2>
            <LoginSocialFacebook
                isOnlyGetToken
                appId={process.env.REACT_APP_FB_APP_ID || ''}
                redirect_uri={REDIRECT_URI}

                onLoginStart={onLoginStart}
                onResolve={({ }) => {
                   
                }}
                onReject={(err) => {
                console.log(err)
                }}
            >
                <FacebookLoginButton />

            </LoginSocialFacebook>

            <LoginSocialTwitter
                isOnlyGetToken
                client_id={process.env.REACT_APP_TWITTER_V2_APP_KEY || ''}
                redirect_uri={REDIRECT_URI}
                onLoginStart={onLoginStart}
                onResolve={({ provider, data }) => {
                setProvider(provider)
                setProfile(data)
                }}
                onReject={(err) => {
                console.log(err)
                }}
            >
                <TwitterLoginButton />
            </LoginSocialTwitter>
            </div>
            
        )}
        </>
        
    )
            }

export default Login

  