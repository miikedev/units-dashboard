import { Outlet } from 'react-router'

const AuthLayout = () => {
  return (
    <main className='min-h-screen mx-3 flex flex-col items-center justify-center'>
        <Outlet />
    </main>
  )
}

export default AuthLayout