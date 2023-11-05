import ChevronUp from '@/components/icons/ChevronUp'
import { FeedConsensusQuestionProps, consensusProps } from '@/types/props'
import Image from 'next/image'
import React, { useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import ReferenceCard from '../cards/ReferenceCard'
import EvidenceComp from './EvidenceComp'

export interface checkStatusProps {
	name: 'FOR' | 'AGAINST'
}

export const menu: checkStatusProps[] = [
	{
		name: 'FOR',
	},
	{
		name: 'AGAINST',
	},
]

const BottomModal = ({ consensusData, evidenceView, setEvidenceView }: any) => {
	const [status, setStatus] = useState('FOR')
	const [isOpen, setisOpen] = useState(false)

	return (
		<div
			className={`absolute shadow-lg -bottom-2 w-full ${
				isOpen ? ' h-3/4' : 'h-48'
			} transform transition-transform duration-300 ease-in-out`}
		>
			<div className='bg-gold p-2 shadow-lg justify-between rounded-t-xl flex items-center text-white font-typo'>
				<div />
				<div className='flex items-center'>
					<Image width={42} height={42} src={'/logo.svg'} alt='delvit logo' />
					<span className='mx-2 capitalize font-typo'>References</span>
				</div>
				<div onClick={() => setisOpen(!isOpen)} className={`p-3 ${isOpen ? 'rotate-180' : ''}`}>
					<ChevronUp />
				</div>
			</div>
			<EvidenceComp consensusData={consensusData} evidenceView={evidenceView} setEvidenceView={setEvidenceView} />
			{/* <div className="p-2 flex w-full bg-lightgold">
        {menu.map((item) => (
          <div
            onClick={() => setStatus(item.name)}
            className={`${
              item.name === status ? "border-b-2" : ""
            } border-gold w-1/2 text-center p-2 text-gold`}
            key={item.name}
          >
            {item.name}
          </div>
        ))}
      </div>
      <div className="bg-lite h-full p-3">
        {consensusData?.post?.map((evidencePostData: any) => (
          <ReferenceCard
            isOpen={evidencePostData.evidenceType === evidenceView}
            key={evidencePostData.evidencePostId}
            title={evidencePostData.title}
            body={evidencePostData.evidencePost.body}
          />
        ))}
        <>
          <div className="rounded-lg my-3 shadow border border-lightgreen">
            <div className="rounded-t-lg border bg-greenish text-center text-white border-green p-2">
              Top
            </div>
            <div className="bg-white  rounded-b-lg p-3">
              <div className="py-3 text-lg font-semibold">{`On-scene doctor calls Biden's incident 'concerning'`}</div>
              <div className="my-3 text-sm">
                Ahey ijxnjaj jai00ja fayu janlld aojisn jieka shan jhans kta na
                tera mera hjxnk
              </div>
            </div>
          </div>

          <div className="rounded my-3 shadow flex">
            <div className=" rounded-l-lg w-3 bg-greenish">.</div>
            <div className="p-3 font-light flex rounded-r-lg bg-white  justify-between">
              <div>{`On-scene doctor calls Biden's incident 'concerning'`}</div>
              <BsChevronDown className="text-gold w-6 h-6 mt-1 text-xl font-bold" />
            </div>
          </div>
        </>
      </div> */}
		</div>
	)
}

export default BottomModal
