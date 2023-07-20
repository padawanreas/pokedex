import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";

function Stats(props) {
  //console.log(props);
  const listStat =
    props.stats &&
    props.stats.map((stat, index) => (
      <div className="stat" key={index}>
        <p key={index} className="font-bold">
          {stat.stat.name}
        </p>

        <ProgressBar
          key={stat.id}
          completed={stat.base_stat}
          bgColor={stat.base_stat > 50 ? "green" : "red"}
          animateOnRender={true}
        />
      </div>
    ));
  return <div className="py-2 px-10">{listStat}</div>;
}

export default Stats;
