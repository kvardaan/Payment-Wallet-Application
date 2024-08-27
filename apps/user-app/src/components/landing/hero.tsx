'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

import starsBg from '@/assets/stars.png'

export const Hero = () => {
	const sectionRef = useRef(null)
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ['start end', 'end start'],
	})

	const backgroundPositionY = useTransform(scrollYProgress, [0, 1], [-300, 300])

	return (
		<motion.section
			ref={sectionRef}
			className="h-[492px] md:!h-[800px] mx-auto w-full flex items-center justify-center overflow-hidden relative bg-black [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
			style={{ backgroundImage: `url(${starsBg.src})`, backgroundPositionY }}
			animate={{
				backgroundPositionX: starsBg.width,
			}}
			transition={{ repeat: Infinity, ease: 'linear', duration: 60 }}
		>
			<div className="absolute inset-0 bg-[radial-gradient(75%_75%_at_center,rgb(140,69,255,.5)_15%,rgb(14,0,36,0.5)_78%,transparent)]"></div>
			{/* Start Planet */}
			<div className="absolute mx-auto h-64 w-64 md:h-96 md:w-96 bg-teal-500 rounded-full border border-white/20 custom-position bg-[radial-gradient(50%_50%_at_16.8%_18.3%,white,rgb(184,148,255)_37.7%,rgb(24,0,66))] shadow-[-20px_-20px_50px_rgb(255,255,255,.5),-20px_-20px_80px_rgb(255,255,255,.1),0_0_50px_rgb(140,69,255)]"></div>
			{/* End Planet */}
			{/* Ring 1 */}
			<motion.div
				animate={{ rotate: '1turn' }}
				style={{ translateX: '0%', translateY: '0%' }}
				transition={{ repeat: Infinity, duration: 45, ease: 'linear' }}
				className="absolute h-[344px] w-[344px] mx-auto md:h-[580px] md:w-[580px] border dark:border-white/50 opacity-50 rounded-full custom-position"
			>
				<div className="absolute h-2 w-2 bg-white rounded-full top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 "></div>
				<div className="absolute h-2 w-2 bg-white rounded-full top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 "></div>
				<div className="absolute h-5 w-5 border border-white rounded-full top-1/2 left-full -translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center">
					<div className="h-2 w-2 bg-white rounded-full"></div>
				</div>
			</motion.div>
			{/* Ring 2 */}
			<motion.div
				animate={{ rotate: '-1turn' }}
				style={{ translateX: '0%', translateY: '0%' }}
				transition={{ repeat: Infinity, duration: 90, ease: 'linear' }}
				className="absolute mx-auto h-[444px] w-[444px] md:h-[780px] md:w-[780px] border md:border-2 dark:border-white/50 opacity-50 rounded-full custom-position border-dashed"
			></motion.div>
			{/* Ring 3 */}
			<motion.div
				animate={{ rotate: '1turn' }}
				style={{ translateX: '0%', translateY: '0%' }}
				transition={{ repeat: Infinity, duration: 90, ease: 'linear' }}
				className="absolute mx-auto h-[544px] w-[544px] md:h-[980px] md:w-[980px] border dark:border-white/50 opacity-50 rounded-full custom-position"
			>
				<div className="absolute h-2 w-2 bg-white rounded-full top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 "></div>
				<div className="absolute h-2 w-2 bg-white rounded-full top-1/2 left-full -translate-x-1/2 -translate-y-1/2 "></div>
			</motion.div>
			{/* Content */}
			<div className="relative container mt-16">
				<h1 className="text-6xl md:!text-[130px] md:leading-none font-semibold tracking-tighter bg-white bg-[radial-gradient(100%_100%_at_top_left,white,white,rgb(74,32,138,.5))] text-transparent bg-clip-text text-center">
					Payment Wallet Application
				</h1>
				<p className="p-1 md:!text-xl text-white/70 mt-5 text-center max-w-xl mx-auto">
					A wallet that makes your daily payments seamless and efficient, without any hassle.
				</p>
			</div>
		</motion.section>
	)
}
