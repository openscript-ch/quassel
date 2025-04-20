import HeroSVG from "../assets/hero.svg?react";
import classes from "./Hero.module.css";

export function Hero() {
  return <HeroSVG className={classes.hero} />;
}
