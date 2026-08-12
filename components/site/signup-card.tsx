"use client";

import { useState } from "react";
import { useLang } from "./lang";

/* Signup card — front-end only, exactly like the mockup: shows the
   confirmation note and sends nothing. Wire to a backend later. */
export default function SignupCard({
  id,
  heading = true,
  cta,
}: {
  id: string;
  heading?: boolean;
  cta: { en: string; es: string };
}) {
  const { t } = useLang();
  const [done, setDone] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setDone(true);
  }

  return (
    <form className="form-card" id={id} noValidate onSubmit={onSubmit}>
      {heading && (
        <>
          <div className="fh">{t({ en: "Start free", es: "Comienza gratis" })}</div>
          <div className="fsub">
            {t({
              en: "Describe one real job. No card, no setup call.",
              es: "Describe un trabajo real. Sin tarjeta, sin llamada de configuración.",
            })}
          </div>
        </>
      )}
      <div className="field">
        <label htmlFor={`${id}-fn`}>{t({ en: "First name", es: "Nombre" })}</label>
        <input
          id={`${id}-fn`}
          name="first_name"
          type="text"
          autoComplete="given-name"
          placeholder="Alex"
          required
        />
      </div>
      <div className="field">
        <label htmlFor={`${id}-em`}>{t({ en: "Work email", es: "Correo de trabajo" })}</label>
        <input
          id={`${id}-em`}
          name="email"
          type="email"
          autoComplete="email"
          placeholder={t({ en: "you@company.com", es: "tu@empresa.com" })}
          required
        />
      </div>
      <button className="btn btn-cta full" type="submit" disabled={done}>
        {t(cta)}
      </button>
      {heading && (
        <p className="fine">
          {t({
            en: "Takes 30 seconds. You can see everything before anything sends.",
            es: "Toma 30 segundos. Ves todo antes de que algo se envíe.",
          })}
        </p>
      )}
      <div className={`form-note${done ? " show" : ""}`} role="status">
        {t({
          en: "Thanks — check your inbox to pick your first job.",
          es: "Gracias — revisa tu correo para elegir tu primer trabajo.",
        })}
      </div>
    </form>
  );
}
