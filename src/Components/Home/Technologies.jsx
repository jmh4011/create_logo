import React from 'react'

import { RiReactjsLine } from 'react-icons/ri'
import { SiTailwindcss } from 'react-icons/si'
import { SiFigma } from 'react-icons/si'
import { SiJavascript } from 'react-icons/si'
import { DiHtml5, DiMysql } from 'react-icons/di'

const Technologies = () => {
  return (
    <div className="border-b border-neutral-900 pb-4 lg:mb-35">
        <h1 className='my-14 text-5xl font-thin tracking-tight text-center'>Technologies</h1>
        <div className='grid grid-cols-2 md:flex md:flex-wrap items-center justify-center gap-6'>
            <div className='rounded-2xl bg-neutral-800 p-4'>
                <RiReactjsLine className='text-7xl text-cyan-400' />
            </div>
            <div className='rounded-2xl bg-neutral-800 p-4'>
                <SiTailwindcss className='text-7xl text-blue-500' />
            </div>
            <div className='rounded-2xl bg-neutral-800 p-4'>
                <SiFigma className='text-7xl text-purple-500' />
            </div>
            <div className='rounded-2xl bg-neutral-800 p-4'>
                <SiJavascript className='text-7xl text-yellow-500' />
            </div>
            <div className='rounded-2xl bg-neutral-800 p-4'>
                <DiHtml5 className='text-7xl text-orange-500' />
            </div>
            <div className='rounded-2xl bg-neutral-800 p-4'>
                <DiMysql className='text-7xl text-blue-500' />
            </div>
        </div>
    </div>
  )
}

export default Technologies