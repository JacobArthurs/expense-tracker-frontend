import { Slide } from "@mui/material";
import React from "react";
import { useInView } from "react-intersection-observer";

export const SlideInComponent = ({ children, direction, disabled }) => {
  const [ref, inView] = useInView({
    rootMargin: '-100px 0px',
  });
  const [triggered, setTriggered] = React.useState(false);

  if (inView && !triggered) {
    setTriggered(true);
  }

  return (
    <div ref={ref}>
      {disabled ? (
        children
      ) : (
        <Slide direction={direction} in={triggered} mountOnEnter unmountOnExit>
          {children}
        </Slide>
      )}
    </div>
  );
}