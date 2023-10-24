import {usePage} from '../lib/graphql/hooks';
import {getComponentsFromContainer, getMenu} from "../util";

function Page() {
    const {
        page,
        loading,
        error
    } = usePage('sandbox-sales02', 'graphql-example', `${window.location.pathname}${window.location.search}`);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div className="has-text-danger">Data unavailable</div>;
    }
    return (
        <div>
            <nav className="navbar">
                <div id="navbarBasicExample">
                    <div className="navbar">
                        {getMenu(page, 'main').items.map((menuItem, index) => {
                            return (
                                <a key={index} href={menuItem.href} className="navbar-item">
                                    {menuItem.name}
                                </a>
                            )
                        })}

                    </div>
                </div>
            </nav>
            <main>
                <h1 className="title is-2">
                    {page.data?.title}
                </h1>
                <h2 className="subtitle is-4">
                    {page.name}
                </h2>
                {getComponentsFromContainer(page, 'main').map((component, index) => {
                    switch (component.name) {
                        case 'TitleAndText':
                            return (
                                <div key={index} className="box ">
                                    <div className="block has-text-grey">
                                        <h4 className={'title is-5'}>{component.content?.title}</h4>
                                    </div>
                                    <div className="block"
                                         dangerouslySetInnerHTML={{__html: component.content?.text?.value}}>
                                    </div>
                                </div>
                            )
                        case 'Banner':
                            return (
                                <div key={index} className="box">
                                    <div className="block has-text-grey">
                                        <h4 className={'title is-5'}>{component.content?.title}</h4>
                                    </div>
                                    <img src={component.content?.image?.original?.links?.site?.href}/>
                                    {component.content?.ctaLabel && <div className="bd-index-buttons hero-buttons">
                                        <a className="button is-large is-primary is-light" href="">
                                            {component.content?.ctaLabel}
                                        </a>
                                    </div>}

                                </div>
                            )
                    }

                })}
            </main>

        </div>
    );
}

export default Page;
