import { BrandLogo } from "@/src/shared/components";
import type { LandingSiteConfig } from "../types";

export function Footer({ site }: { site: LandingSiteConfig }){
 const companyLinks=[["Privacy Policy",site.links.privacy],["Terms of Service",site.links.terms],["Security",site.links.security],["Contact",site.links.contact]].filter((entry)=>Boolean(entry[1]));
 return <footer><div className="wrap footer-grid"><div><a className="brand inverse" href="#top"><BrandLogo inverse /></a><p>Your voice starts it.<br/>You decide what happens next.</p><a className="footer-cta" href={site.primaryCta.href}>{site.primaryCta.label}</a></div><div><strong>Product</strong><a href="#actions">Actions</a><a href="#dictation">Dictation</a><a href="#memory">Memory</a><a href="#download">Request access</a></div>{companyLinks.length>0&&<div><strong>Company</strong>{companyLinks.map(([label,url])=><a key={label} href={url}>{label}</a>)}</div>}</div><div className="wrap copyright"><span>© {new Date().getFullYear()} Mello</span></div></footer>
}
