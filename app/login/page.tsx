import Image from "next/image"
import LckrLogo from "@/public/lckr-logo.png"
import Link from "next/link"

export default function Login(){
    return (<div className="bg-gray-custom w-screen h-screen">
        <div className='bg-white flex w-[400px] h-[500px] rounded-lg flex-col gap-4 m-auto shadow-lg my-32 p-8'>
            <Image src={LckrLogo} width={50} height={50} alt="LCKR Logo" className="rounded-md"></Image>
            <h1 className="text-xl font-bold">Entrar</h1>
            <p className="text-sm text-gray-500 -mt-4">Acesse o painel da LCKR Club.</p>
            <label htmlFor="email">E-mail</label>
            <input type="text" placeholder='secretaria@lckrclub.com' className='-mt-3 border border-gray-custom rounded-lg p-2'/>
            <label htmlFor="password">Senha</label>
            <input type="password" placeholder='*********' className='-mt-3 border border-gray-custom rounded-lg p-2'/>
            <Link href="/forgot-password" className="ml-auto text-green-logo hover:text-green-logo/80 font-semibold">Esqueci minha senha</Link>
            <button className="bg-green-logo text-black font-semibold rounded-lg hover:bg-green-logo/90  hover:cursor-pointer p-2 mt-4">Entrar</button>
            <hr className="text-gray-200 mt-4"></hr>
        </div>

    </div>)
}