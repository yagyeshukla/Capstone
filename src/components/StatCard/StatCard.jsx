import classes from "./StatCard.module.scss";
export default function StatCard({ label, score, Icon }) {
  let labelClass;
  if (score === "BAD") labelClass = "bad";
  if (score === "OK") labelClass = "ok";
  if (score === "GOOD") labelClass = "good";
  if (score === "EXCELLENT") labelClass = "excellent";

  if (typeof score === "number") {
    if (!Number.isInteger(score)) score = `${score.toFixed(2)}%`;
  }
  return (
    <li className={classes.stats}>
      <div className={classes.stats__container}>
        <h1 className={classes.stats__title}>{label}</h1>
        <p
          className={`${classes[`${labelClass}`]} ${
            classes.stats__description
          }`}
        >
          {score}
        </p>
      </div>
      <Icon className={classes.stats__icon} />
    </li>
  );
}
