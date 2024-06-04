'use client';

import { useRef ,useEffect, useState} from 'react'
import { makeStore,AppStore } from './store';
import { Provider } from 'react-redux';
import { Persistor, persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

interface Props {
	children: React.ReactNode;
}

export default function CustomProvider({ children }: Props) {
	const storeRef = useRef<AppStore>()
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore()
    }

    const persistore = useRef<Persistor>()
    if(!persistore.current){
        persistore.current= persistStore(storeRef.current)
    }

    return <Provider store={storeRef.current}>
        <PersistGate persistor={persistore.current}>
            {children}
        </PersistGate>
    </Provider>
}