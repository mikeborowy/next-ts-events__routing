import { FormEvent, useRef } from "react";
import { fetchNewsletterAPI } from "../../api/mongo/fetchNewsletter";
import { useNotificationContext } from "../../contexts/notification.context";
import classes from "./newsletter-registration.module.css";

export function NewsletterRegistration() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const { showNotification } = useNotificationContext();

  const registrationHandler = async (event: FormEvent) => {
    event.preventDefault();

    showNotification({
      status: "pending",
      title: "Signing Up!",
      message: "Registering for newsletter",
    });

    if (emailRef.current?.value) {
      const response = await fetchNewsletterAPI({
        method: "POST",
        body: { email: emailRef.current?.value },
      });

      if (response?.email) {
        showNotification({
          status: "success",
          title: "Signed Up!",
          message: "Registering for newsletter",
        });
      } else {
        showNotification({
          status: "error",
          title: "Error!",
          message: "Registering for newsletter",
        });
      }
    }
  };

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}
