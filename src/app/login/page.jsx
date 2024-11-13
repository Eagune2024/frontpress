import LoginPage from './login'
import { permanentRedirect } from 'next/navigation'

export default async function LoginView () {
  if (process.env.NODE_ENV === 'development') return (<LoginPage />)
  return permanentRedirect('/ppt') 
}