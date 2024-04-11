import React from 'react';
import rightLeaf from './right-leave.svg'


const RightLeaf = () => {
    return (
        <img src={rightLeaf} style={{height: '100vh', position: 'absolute', bottom: 0, right: 0, zIndex: 0}} alt=""/>
    );
};

export default RightLeaf;