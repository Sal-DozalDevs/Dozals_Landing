"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useLang } from "@/components/site/lang";
import SignupCard from "@/components/site/signup-card";
import StickyCta from "@/components/site/sticky-cta";

const CREW = [
  {
    src: "/characters/dozal-coral.png",
    name: "Dozal",
    w: 437,
    h: 561,
    role: { en: "Takes your brief", es: "Recibe tu encargo" },
  },
  {
    src: "/characters/lindy-blue.png",
    name: "Lindy",
    w: 445,
    h: 566,
    role: { en: "Guest replies", es: "Respuestas a huéspedes" },
  },
  {
    src: "/characters/gumloop-green.png",
    name: "Gumloop",
    w: 547,
    h: 592,
    role: { en: "Inbox cleanup", es: "Limpieza del buzón" },
  },
  {
    src: "/characters/vellum-amber.png",
    name: "Vellum",
    w: 510,
    h: 555,
    role: { en: "Refunds & records", es: "Reembolsos y registro" },
  },
  {
    src: "/characters/panel7-violet.png",
    name: "Panel 7",
    w: 530,
    h: 564,
    role: { en: "Dev help", es: "Ayuda para dev" },
  },
];

export default function Home() {
  const { lang, t } = useLang();

  useEffect(() => {
    document.title =
      lang === "es"
        ? "DozalDevs — El trabajo en la computadora, fuera de tu escritorio."
        : "DozalDevs — The computer work, off your desk.";
  }, [lang]);

  return (
    <>
      {/* ============ hero (the 5-second test) ============ */}
      <section className="hero" id="hero" data-section="Hero">
        <div className="wrap grid">
          <div>
            <span className="eyebrow">
              {t({
                en: "DozalDevs — done-for-you operations",
                es: "DozalDevs — operaciones resueltas",
              })}
            </span>
            <h1 style={{ marginTop: 14 }}>
              {t({
                en: "The computer work, off your desk.",
                es: "El trabajo en la computadora, fuera de tu escritorio.",
              })}
            </h1>
            <p className="lede">
              {t({
                en: "DozalDevs takes the multi-step computer work off your desk and hands it back finished. You describe the job in plain words and see everything it did.",
                es: "DozalDevs se lleva el trabajo de varios pasos de tu escritorio y te lo devuelve hecho. Describes el trabajo en palabras simples y ves todo lo que hizo.",
              })}
            </p>
            <span className="trust">
              <span className="dot"></span>
              <span>
                {t({
                  en: "You stay in control — nothing sends without your OK when you arm a stop.",
                  es: "Tú sigues al mando — nada se envía sin tu OK cuando activas una pausa.",
                })}
              </span>
            </span>
            <div className="hero-char">
              <Image
                src="/characters/dozal-coral-large.png"
                alt={t({ en: "Dozal, your DozalDevs helper", es: "Dozal, tu ayudante de DozalDevs" })}
                width={1500}
                height={1950}
                priority
              />
              <span className="cap">
                {t({ en: "Hand it to Dozal.", es: "Pásaselo a Dozal." })}
                <br />
                {t({ en: "Your crew does the work.", es: "Tu crew hace el trabajo." })}
              </span>
            </div>
          </div>

          <figure>
            <SignupCard id="hero-form" cta={{ en: "Get started for free", es: "Comienza gratis" }} />
          </figure>
        </div>
      </section>

      {/* ============ the stack (problem agitation) ============ */}
      <section className="section band" id="the-stack" data-section="The Stack">
        <div className="wrap stack">
          <h2>
            <span>{t({ en: "Fourteen tabs. ", es: "Catorce pestañas. " })}</span>
            <span className="word">
              {t({ en: "Zero of them are the work.", es: "Ninguna es el trabajo." })}
            </span>
          </h2>
          <p>
            {t({
              en: "The enemy isn't a competitor. It's the stack — the fourteen tabs, the seat licences, the onboarding call, the integration that broke last Tuesday, the “we just need to set it up” that became a quarter. You didn't sign up to run software. You signed up to get work done.",
              es: "El enemigo no es un competidor. Es el stack — las catorce pestañas, las licencias por asiento, la llamada de arranque, la integración que se rompió el martes pasado, el “solo hay que configurarlo” que se volvió un trimestre. No te apuntaste para operar software. Te apuntaste para sacar el trabajo.",
            })}
          </p>
        </div>
      </section>

      {/* ============ three pillars (control, transparency, value) ============ */}
      <section className="section" id="pillars" data-section="Pillars">
        <div className="wrap">
          <div className="sec-head">
            <h2>
              {t({
                en: "Delegating shouldn't feel like losing control.",
                es: "Delegar no debería sentirse como perder el control.",
              })}
            </h2>
            <p>
              {t({
                en: "Three things make handing off the work feel safe.",
                es: "Tres cosas hacen que entregar el trabajo se sienta seguro.",
              })}
            </p>
          </div>
          <div className="cards">
            <div className="card">
              <div className="ic" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5.5h16v10H9l-4 4z" />
                  <path d="M8 9.5h8M8 12.5h5" />
                </svg>
              </div>
              <h3>{t({ en: "Say it, don't build it", es: "Se encarga en lenguaje simple" })}</h3>
              <p>
                {t({
                  en: "Plain-English commissioning. No flowcharts, no setup, no course.",
                  es: "Se encarga en lenguaje simple. Sin diagramas, sin configuración, sin curso.",
                })}
              </p>
            </div>
            <div className="card">
              <div className="ic" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h3>{t({ en: "You see everything it did", es: "Mira todo lo que hizo" })}</h3>
              <p>
                {t({
                  en: "A readable record of every action. Failures we surface, not ones you discover.",
                  es: "Un registro legible de cada acción. Fallas que te avisamos, no que descubres.",
                })}
              </p>
            </div>
            <div className="card">
              <div className="ic" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.6 13.4 12.4 21.6a2 2 0 0 1-2.8 0L3 15V4.5A1.5 1.5 0 0 1 4.5 3H15l5.6 5.6a2 2 0 0 1 0 2.8z" />
                  <path d="M7.5 7.5h.01" />
                </svg>
              </div>
              <h3>{t({ en: "Buy the work, not the tool", es: "Compras el trabajo, no la herramienta" })}</h3>
              <p>
                {t({
                  en: "Priced against the work, not the seat. Measured in work completed.",
                  es: "Con precio por el trabajo, no por el asiento. Medido en trabajo terminado.",
                })}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ social proof ============ */}
      <section className="section band" id="proof" data-section="Social Proof">
        <div className="wrap">
          <div className="sec-head">
            <h2>{t({ en: "Real jobs, handed off.", es: "Trabajos reales, delegados." })}</h2>
            <p>
              {t({
                en: "Operators who stopped running software and started handing off work.",
                es: "Operadores que dejaron de operar software y empezaron a delegar el trabajo.",
              })}
            </p>
          </div>
          <div className="quotes">
            <figure className="quote">
              <p className="q">
                {t({
                  en: "“I used to drown in guest messaging. Now DozalDevs takes the routine messages off my hands, and I can see every single reply written on the record. Zero setup anxiety.”",
                  es: "“Solía ahogarme respondiendo mensajes de huéspedes. Ahora DozalDevs se encarga de los mensajes de rutina y puedo ver cada respuesta registrada en el historial. Cero ansiedad de configuración.”",
                })}
              </p>
              <span className="chip">
                {t({ en: "Guest replies, off her desk", es: "Respuestas a huéspedes, fuera de su escritorio" })}
              </span>
              <figcaption className="who">
                <span className="avatar" aria-hidden="true">
                  AM
                </span>
                <span>
                  <strong>Alex Mercer</strong>
                  <span>{t({ en: "STR host", es: "Administrador de propiedades" })}</span>
                </span>
              </figcaption>
            </figure>
            <figure className="quote">
              <p className="q">
                {t({
                  en: "“After my Zapier setup broke silently for a week, I switched. DozalDevs alerts me immediately if a job stops. That's the control I needed.”",
                  es: "“Después de que mi configuración de Zapier se rompió en silencio por una semana, cambié. DozalDevs me avisa de inmediato si un trabajo se detiene. Ese es el control que necesitaba.”",
                })}
              </p>
              <span className="chip">
                {t({ en: "Told the moment a job stops", es: "Avisada cuando un trabajo se detiene" })}
              </span>
              <figcaption className="who">
                <span className="avatar" aria-hidden="true">
                  SJ
                </span>
                <span>
                  <strong>Sarah Jenkins</strong>
                  <span>{t({ en: "Solo founder", es: "Fundadora" })}</span>
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ============ meet the crew (characters) ============ */}
      <section className="section" id="crew" data-section="Crew">
        <div className="wrap">
          <div className="sec-head">
            <h2>{t({ en: "Meet the crew", es: "Conoce al crew" })}</h2>
            <p>
              {t({
                en: "The characters carry the warmth; the interface stays quiet. You stay the hero — a Dozal is your sidekick, doing the work inside the apps you already use.",
                es: "Los personajes llevan la calidez; la interfaz se queda quieta. Tú sigues siendo el héroe — un Dozal es tu compañero que hace el trabajo dentro de las apps que ya usas.",
              })}
            </p>
          </div>
          <div className="crew">
            {CREW.map((c) => (
              <figure key={c.name}>
                <Image src={c.src} alt={c.name} width={c.w} height={c.h} loading="lazy" style={{ width: "100%", height: "auto" }} />
                <figcaption>
                  <strong>{c.name}</strong>
                  <span>{t(c.role)}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="crew-note">
            <p>
              {t({
                en: "You run the business. The work gets done.",
                es: "Tú llevas el negocio. El trabajo se hace.",
              })}
            </p>
            <span>
              {t({
                en: "The user stays the hero. DozalDevs stays the sidekick. That's the whole structure.",
                es: "El usuario sigue siendo el héroe. DozalDevs sigue siendo el compañero. Esa es toda la estructura.",
              })}
            </span>
          </div>
        </div>
      </section>

      {/* ============ final CTA (repeat form) ============ */}
      <section className="section band close" id="start" data-section="CTA">
        <div className="wrap">
          <h2>
            {t({
              en: "Stop running software. Start handing off work.",
              es: "Deja de operar software. Comienza a delegar.",
            })}
          </h2>
          <p className="lede">
            {t({
              en: "Start with one real, recurring job. See everything it does before anything sends.",
              es: "Empieza con un trabajo real y recurrente. Ves todo lo que hace antes de que algo se envíe.",
            })}
          </p>
          <SignupCard id="close-form" heading={false} cta={{ en: "Start now", es: "Comienza ahora" }} />
        </div>
      </section>

      {/* ============ persistent CTA ============ */}
      <StickyCta />
    </>
  );
}
