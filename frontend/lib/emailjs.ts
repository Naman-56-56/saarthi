// EmailJS integration for sending emails from frontend
import emailjs from 'emailjs-com';

type OtpParams = {
  email: string;
  passcode: string;
  time: string;
};

export function sendOtpEmailJS({ email, passcode, time }: OtpParams) {
  const serviceID = 'service_e3rc8vk';
  const templateID = 'template_raigphg';
  const userID = 'crHauJ88UDzOS4puy';

  const templateParams = {
    email,
    passcode,
    time,
  };

  return emailjs.send(serviceID, templateID, templateParams, userID);
}
