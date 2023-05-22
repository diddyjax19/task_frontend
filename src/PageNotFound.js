import React from 'react';
import Header from './components/Header';

const PageNotFound = () => {
    return (
        <div>
            <Header />
            <div className="py-5">
                <h3 className="text-center text-uppercase">404: Page Not Found</h3>
            </div>
        </div>
    );
};

export default PageNotFound;