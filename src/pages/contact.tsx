import { Helmet } from "react-helmet-async";
import ContactForm from "@/components/contact-form";
import { Check, Mail, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact | World Egypt</title>
      </Helmet>

      <section className="relative py-14">
        <div className="pointer-events-none absolute -inset-y-20 inset-x-0 bg-[radial-gradient(ellipse_35%_15%_at_40%_55%,hsl(var(--accent))_0%,transparent_100%)] lg:bg-[radial-gradient(ellipse_12%_20%_at_60%_45%,hsl(var(--accent))_0%,transparent_100%)]"></div>
        <div className="pointer-events-none absolute -inset-y-20 inset-x-0 bg-[radial-gradient(ellipse_35%_20%_at_70%_75%,hsl(var(--accent))_0%,transparent_80%)] lg:bg-[radial-gradient(ellipse_15%_30%_at_70%_65%,hsl(var(--accent))_0%,transparent_80%)]"></div>
        <div className="pointer-events-none absolute -inset-y-20 inset-x-0 bg-[radial-gradient(hsl(var(--accent-foreground)/0.1)_1px,transparent_1px)] [background-size:8px_8px] [mask-image:radial-gradient(ellipse_60%_60%_at_65%_50%,#000_0%,transparent_80%)]"></div>
        <div className="container grid w-full grid-cols-1 gap-x-32 overflow-hidden lg:grid-cols-2">
          <div className="w-full pb-10 md:space-y-10 md:pb-0">
            <div className="space-y-4 md:max-w-[40rem]">
              <h1 className="text-4xl font-medium lg:text-5xl">
                Contact for any information
              </h1>
              <div className="text-muted-foreground md:text-base font-light">
                In non libero bibendum odio pellentesque ullamcorper. Aenean
                condimentum, dolor commodo pulvinar bibendum.
              </div>
            </div>
            <div className="hidden md:block">
              <div className="space-y-16 pb-20 lg:pb-0">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <p className="text-sm font-semibold">
                      What you can expect:
                    </p>
                    <div className="flex items-center space-x-2.5">
                      <Check size={18} />
                      <p className="text-sm">
                        Detailed product presentation tailored to you
                      </p>
                    </div>
                    <div className="flex items-center space-x-2.5">
                      <Check size={18} />
                      <p className="text-sm">
                        Consulting on your messaging strategy
                      </p>
                    </div>
                    <div className="flex items-center space-x-2.5">
                      <Check size={18} />
                      <p className="text-sm">
                        Answers to all the questions you have
                      </p>
                    </div>

                    <div className="flex items-center space-x-2.5">
                      <Check size={18} />
                      <p className="text-sm">
                        Answers to all the questions you have
                      </p>
                    </div>

                    <div className="flex items-center space-x-2.5">
                      <Check size={18} />
                      <p className="text-sm">
                        Answers to all the questions you have
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-5">
                  <div className="inline-flex items-center gap-2 border px-2.5 py-4 rounded-lg bg-gray-100">
                    <Phone size={18} /> +1 (555) 123-4567
                  </div>
                  <div className="inline-flex items-center gap-2 border px-2.5 py-4 rounded-lg bg-green-50">
                    <Mail size={18} /> 0y6h4@example.com
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex w-full justify-center lg:mt-2.5 py-2">
            <ContactForm className="w-full bg-white rounded-xl p-5 shadow border" />
          </div>
        </div>
      </section>
    </>
  );
}
