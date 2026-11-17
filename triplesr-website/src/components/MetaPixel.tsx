"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const PIXEL_ID = "4571011303146744";

// Meta Pixel. Loads only after the visitor chooses "Allow analytics & ads" in the consent banner.
export function MetaPixel() {
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    const read = () => {
      try {
        setAllowed(localStorage.getItem("tsr-consent") === "all");
      } catch {
        setAllowed(false);
      }
    };
    read();
    window.addEventListener("tsr-consent-change", read);
    return () => window.removeEventListener("tsr-consent-change", read);
  }, []);
  if (!allowed) return null;
  return (
    <Script id="meta-pixel" strategy="afterInteractive">{`
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${PIXEL_ID}');
fbq('track', 'PageView');
`}</Script>
  );
}
