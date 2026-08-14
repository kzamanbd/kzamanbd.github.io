'use server';

import { firestore } from '@/utils/firebase';
import {
    addDoc,
    collection,
    doc,
    DocumentData,
    getDocs,
    increment,
    serverTimestamp,
    updateDoc
} from 'firebase/firestore';
import { headers } from 'next/headers';

export interface Link {
    id: string;
    longUrl: string;
    shortUrl: string;
    slug: string;
    createdAt: Date;
    clicks: number;
}

const linkCollections = () => collection(firestore, 'links');

export const getLinks = async (): Promise<Link[]> => {
    const snapshot = await getDocs(linkCollections());
    const links = snapshot.docs.map(
        (doc) =>
            ({
                id: doc.id,
                ...doc.data()
            }) as Link
    );
    return links;
};

export const updateLink = async (id: string, data: Partial<Omit<Link, 'id'>>): Promise<void> => {
    const linkDoc = doc(firestore, 'links', id);
    await updateDoc(linkDoc, data as DocumentData);
};

export const updateLinkVisitCount = async (id: string): Promise<void> => {
    const linkDoc = doc(firestore, 'links', id);
    await updateDoc(linkDoc, {
        clicks: increment(1)
    } as DocumentData);
};

export const createLink = async (longUrl: string): Promise<Link> => {
    // Generate a random 6-character slug
    const slug = Math.random().toString(36).substring(2, 8);

    const h = await headers();
    const host = h.get('host');
    const protocol = h.get('x-forwarded-proto') || 'http';
    const baseUrl = `${protocol}://${host}`;

    const linkData = {
        longUrl,
        slug,
        clicks: 0,
        shortUrl: `${baseUrl}/shorturl/${slug}`,
        createdAt: serverTimestamp()
    };

    const linksCollection = collection(firestore, 'links');
    const docRef = await addDoc(linksCollection, linkData);

    return {
        id: docRef.id,
        ...linkData,
        createdAt: new Date() // Replace serverTimestamp with a Date object
    } as Link;
};

export const getLinkBySlug = async (slug: string): Promise<Link | null> => {
    const snapshot = await getDocs(linkCollections());
    const link = snapshot.docs.find((doc) => doc.data().slug === slug);
    return link ? ({ id: link.id, ...link.data() } as Link) : null;
};
