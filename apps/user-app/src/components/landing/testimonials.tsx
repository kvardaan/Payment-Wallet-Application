'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

import avatar1 from '@/assets/avatar-1.png'
import avatar2 from '@/assets/avatar-2.png'
import avatar3 from '@/assets/avatar-3.png'
import avatar4 from '@/assets/avatar-4.png'

const testimonials = [
	{
		text: '"This digital wallet has completely transformed how I manage my daily finances"',
		name: 'Sophia Perez',
		title: 'Freelance Designer',
		avatarImg: avatar1,
	},
	{
		text: '"The seamless bank integration and instant transfers have revolutionized my business operations"',
		name: 'Jamie Lee',
		title: 'Small Business Owner',
		avatarImg: avatar2,
	},
	{
		text: '"The user interface is so intuitive and secure, it has made managing my money a breeze"',
		name: 'Alisa Hester',
		title: 'Software Developer',
		avatarImg: avatar3,
	},
	{
		text: '"Sending money to friends and splitting bills has never been easier since I started using this wallet"',
		name: 'Alec Whitten',
		title: 'College Student',
		avatarImg: avatar4,
	},
]

export const Testimonials = () => {
	return (
		<section className="py-20 md:py-24">
			<div className="container">
				<h2 className="tracking-tighter text-5xl md:text-6xl font-medium text-center">
					Beyond Expectations
				</h2>
				<p className="dark:text-white/70 text-lg md:text-xl tracking-tight text-center mt-5 max-w-sm mx-auto">
					Our revolutionary AI SEO tools have transformed our clients
				</p>
				<div className="flex overflow-hidden mt-10 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
					<motion.div
						initial={{
							translateX: '-50%',
						}}
						animate={{
							translateX: '0',
						}}
						transition={{
							repeat: Infinity,
							ease: 'linear',
							duration: 30,
						}}
						className="flex gap-5 pr-5 flex-none"
					>
						{[...testimonials, ...testimonials].map((testimonial) => (
							<div
								key={testimonial.name}
								className="border border-white/15 p-6 md:p-10 rounded-xl bg-[linear-gradient(to_top_right,rgb(140,69,255,0.3),black)] max-w-xs md:max-w-md flex flex-col justify-between"
							>
								<div className="text-lg md:text-2xl tracking-tight text-white">
									{testimonial.text}
								</div>
								<div className="flex items-center gap-3 mt-5">
									<div className="relative after:content-[''] after:absolute after:inset-0 after:mix-blend-soft-light after:rounded-lg before:content-[''] before:absolute before:inset-0 before:border before:border-white/30 before:z-10 before:rounded-lg">
										<Image
											src={testimonial.avatarImg}
											alt={`Avatar for ${testimonial.name}`}
											className="h-11 w-11 rounded-lg"
										/>
									</div>
									<div className="text-white">
										<div>{testimonial.name}</div>
										<div className="text-white/75 dark:text-white/50 text-sm">
											{testimonial.title}
										</div>
									</div>
								</div>
							</div>
						))}
					</motion.div>
				</div>
			</div>
		</section>
	)
}
