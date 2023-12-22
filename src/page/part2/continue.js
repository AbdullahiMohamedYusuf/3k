import React, { useState } from "react";
import MultiStep from "react-multistep";
import UserProfile from "./UserProfile";
import CompanyProfile from "./CompanyProfile";
import Footer from "../../components/footer/footer";
import Head from "../../components/head";
import axios from "axios";

function Continue() {
  const [activeStep, setActiveStep] = useState(0);
  const [formCompletion, setFormCompletion] = useState({
    step1: false,
    step2: false,
  });

  const prevButton = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const nextButton = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleStepCompletion = (stepNumber, isComplete) => {
    setFormCompletion((prevCompletion) => ({
      ...prevCompletion,
      [stepNumber]: isComplete,
    }));
  };

  return (
    <div className="bodyWrapper">
      <Head />
      <div className="multi">
        <MultiStep
          activeStep={activeStep}
          prevButton={prevButton}
          nextButton={nextButton}
        >
          <UserProfile
            title="Step 1"
            onComplete={() => {
              handleStepCompletion("step1", true);
              nextButton(); // Move to the next step
            }}
          />

          <CompanyProfile
            title="Step 2"
            onComplete={() => handleStepCompletion("step2", true)}
          />
        </MultiStep>
      </div>
    </div>
  );
}

export default Continue;
