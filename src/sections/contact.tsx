import ContactForm from "@/components/contact-form";

export default function ContactSection() {
  return (
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
                <div className="mt-16 flex overflow-hidden">
                  <span className="relative flex shrink-0 overflow-hidden rounded-full size-11">
                    <img
                      className="aspect-square h-full w-full"
                      src="https://www.shadcnblocks.com/images/block/avatar-1.webp"
                    />
                  </span>
                  <span className="relative flex shrink-0 overflow-hidden rounded-full -ml-4 size-11">
                    <img
                      className="aspect-square h-full w-full"
                      src="https://www.shadcnblocks.com/images/block/avatar-3.webp"
                    />
                  </span>
                  <span className="relative flex shrink-0 overflow-hidden rounded-full -ml-4 size-11">
                    <img
                      className="aspect-square h-full w-full"
                      src="https://www.shadcnblocks.com/images/block/avatar-2.webp"
                    />
                  </span>
                </div>
                <div className="space-y-4">
                  <p className="text-sm font-semibold">What you can expect:</p>
                  <div className="flex items-center space-x-2.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-check size-5 shrink-0 text-muted-foreground"
                    >
                      <path d="M20 6 9 17l-5-5"></path>
                    </svg>
                    <p className="text-sm">
                      Detailed product presentation tailored to you
                    </p>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-check size-5 shrink-0 text-muted-foreground"
                    >
                      <path d="M20 6 9 17l-5-5"></path>
                    </svg>
                    <p className="text-sm">
                      Consulting on your messaging strategy
                    </p>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-check size-5 shrink-0 text-muted-foreground"
                    >
                      <path d="M20 6 9 17l-5-5"></path>
                    </svg>
                    <p className="text-sm">
                      Answers to all the questions you have
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-12">
                <img
                  src="https://www.shadcnblocks.com/images/block/logos/astro.svg"
                  alt="placeholder"
                  className="h-6"
                />
                <img
                  src="https://www.shadcnblocks.com/images/block/logos/shadcn-ui.svg"
                  alt="placeholder"
                  className="h-6"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex w-full justify-center lg:mt-2.5 py-2">
          <ContactForm className="w-full bg-white rounded-xl p-5 shadow border" />
        </div>
      </div>
    </section>
  );
}
