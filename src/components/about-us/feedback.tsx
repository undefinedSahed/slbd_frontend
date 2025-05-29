"use client"

import { useState, useEffect } from "react"
import { FaFacebook, FaTwitterSquare, FaTiktok, FaInstagram } from "react-icons/fa"
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from "react-icons/ai"
import { motion } from "framer-motion"
import Link from "next/link"

export default function Feedback() {
  const [feedback, setFeedback] = useState<"like" | "dislike" | null>(null)

  useEffect(() => {
    // Load saved feedback from localStorage on component mount
    const savedFeedback = localStorage.getItem("articleFeedback")
    if (savedFeedback === "like" || savedFeedback === "dislike") {
      setFeedback(savedFeedback)
    }
  }, [])

  const handleFeedback = (type: "like" | "dislike") => {
    const newFeedback = feedback === type ? null : type
    setFeedback(newFeedback)

    // Save to localStorage
    if (newFeedback) {
      localStorage.setItem("articleFeedback", newFeedback)
    } else {
      localStorage.removeItem("articleFeedback")
    }
  }

  return (
    <section className="py-10 bg-gray-200">
      <div className="container mx-auto text-center items-center justify-center">
        <h2 className="text-xl lg:text-2xl font-semibold">Did you find this information useful?</h2>
        <div className="flex gap-4 my-5 justify-center">
          <motion.button
            className={`flex items-center gap-2 border text-sm px-4 py-1 hover:bg-gray-100 transition ${feedback === "like" ? "bg-gray-100 text-[#2BA14D]" : ""}`}
            onClick={() => handleFeedback("like")}
            whileTap={{ scale: 0.95 }}
            animate={feedback === "like" ? { y: [0, -5, 0] } : {}}
            transition={{ duration: 0.3 }}
          >
            {feedback === "like" ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                <AiFillLike className="text-lg text-[#2BA14D]" />
              </motion.div>
            ) : (
              <AiOutlineLike className="text-lg" />
            )}
            YES
          </motion.button>

          <motion.button
            className={`flex items-center gap-2 border text-sm px-4 py-2 hover:bg-gray-100 transition ${feedback === "dislike" ? "bg-gray-100 text-[#2BA14D]" : ""}`}
            onClick={() => handleFeedback("dislike")}
            whileTap={{ scale: 0.95 }}
            animate={feedback === "dislike" ? { y: [0, -5, 0] } : {}}
            transition={{ duration: 0.3 }}
          >
            {feedback === "dislike" ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                <AiFillDislike className="text-lg text-[#2BA14D]" />
              </motion.div>
            ) : (
              <AiOutlineDislike className="text-lg" />
            )}
            NO
          </motion.button>
        </div>
        <p>Still have questions? Our lighting experts are ready to help.</p>
        <Link href='/contact' >
          <button className="my-6 bg-[#2BA14D] text-white px-8 py-2 text-sm hover:bg-primary/90 cursor-pointer">
            Contact Team
          </button>
        </Link>

        <div className="flex gap-2 items-center justify-center">
          <Link href="https://www.facebook.com/profile.php?id=100090851693362" target="_blank">
            <FaFacebook className="text-xl hover:text-[#2BA14D] transition duration-700 hover:scale-110" />
          </Link>
          <FaTwitterSquare className="text-xl hover:text-[#2BA14D] transition duration-700 hover:scale-110" />
          <FaTiktok className="text-xl hover:text-[#2BA14D] transition duration-700 hover:scale-110" />
          <FaInstagram className="text-xl hover:text-[#2BA14D] transition duration-700 hover:scale-110" />
        </div>
      </div>
    </section>
  )
}
