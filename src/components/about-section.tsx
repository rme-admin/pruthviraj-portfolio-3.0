export default function AboutSection() {
    return (
        <section id="about" className="py-20 md:py-32 bg-card scroll-mt-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold">About Me</h2>
                </div>

                <div className="space-y-12">
                    <div>
                        <h3 className="text-3xl font-bold text-center mb-8 font-headline">Personal Statement</h3>
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-center">
                            A passionate Senior Software Engineer transforming complex problems into elegant, user-centric solutions. I have a strong background in both research and technical projects, with a Master's in Physics providing a unique analytical perspective to my software development work.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
