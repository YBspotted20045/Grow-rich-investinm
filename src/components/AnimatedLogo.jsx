import { motion } from "framer-motion";
import logo from "../assets/logo.png";

export default function AnimatedLogo() {
  return (
    <motion.img
      src={logo}
      alt="GrowRichInvestments Logo"
      style={{
        width: 120,
        height: 120,
        position: "absolute",
        top: 20,
        left: 20,
        zIndex: 1000
      }}
      animate={{
        x: ["0%", "10%", "-10%", "0%"],
        y: ["0%", "10%", "-10%", "0%"],
        rotate: [0, 5, -5, 0]
      }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}
