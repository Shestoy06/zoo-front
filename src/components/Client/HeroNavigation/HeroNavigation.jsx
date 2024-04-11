import React, {useState} from 'react';
import s from "./HeroNavigation.module.css";

const HeroNavigation = () => {

    const [activeTab, setActiveTab] = useState('');

    return (
        <div style={{width: '100%', height: '100%', display: 'flex', gap: 40, position: 'relative'}}>
            <div className={s.navigation}>
                <div className={s.navigation__item} onClick={() => setActiveTab('info')}>Info</div>
                <div className={s.navigation__item} onClick={() => setActiveTab('animals')}>Animaux</div>
                <div className={s.navigation__item} onClick={() => setActiveTab('habitats')}>Habitats</div>
                <div className={s.navigation__item}>Avis</div>
            </div>
            <div style={{position: 'relative', width: '100%'}}>
                <div className={s.navigation__content}>

                    <div className={activeTab === 'info' ? s.visible : s.hidden}>
                        This is info
                    </div>
                    <div className={activeTab === 'animals' ? s.visible : s.hidden}>
                        This is animals
                    </div>
                    <div className={activeTab === 'habitats' ? s.visible : s.hidden}>
                        This is habitats
                    </div>
                </div>
            </div>

        </div>

    );
};


export default HeroNavigation;