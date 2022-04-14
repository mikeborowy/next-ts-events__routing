import { FormEvent, useRef } from "react";
import { fetchNewsletterAPI } from "../../api/mongo/fetchNewsletter";
import classes from "./newsletter-registration.module.css";

export function NewsletterRegistration() {
  const emailRef = useRef<HTMLInputElement | null>(null);

  const registrationHandler = async (event: FormEvent) => {
    event.preventDefault();

    if (emailRef.current?.value) {
      fetchNewsletterAPI({
        method: "POST",
        body: { email: emailRef.current?.value },
      });
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
