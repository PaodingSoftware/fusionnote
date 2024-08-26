function Content({ children }: { children: React.ReactNode }) {
    return (
        <section className="section">
            <div className="container">
                {children}
            </div>
        </section>
    );
}

export default Content;