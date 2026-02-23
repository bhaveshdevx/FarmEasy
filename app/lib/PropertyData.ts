export interface Property {
    id: string;
    name: string;
    location: string;
    state: string;
    price: number;
    currency: string;
    rating: number;
    reviewCount: number;
    images: string[];
    amenities: string[];
    host: {
        name: string;
        avatar: string;
        handle: string;
        isSuperhost: boolean;
        joinedYear: number;
    };
    guests: number;
    bedrooms: number;
    baths: number;
    type: string;
    tags: string[];
    likes: number;
    comments: number;
    badge?: string;
}

export const properties: Property[] = [
    {
        id: "1",
        name: "The Hidden Pine Cabin",
        location: "Lonavala",
        state: "Maharashtra",
        price: 8000,
        currency: "₹",
        rating: 4.9,
        reviewCount: 128,
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBHM-A_jZp9Ttl2d7ZdBf-Hv9weUrGKTLMHF-6EeC2CUpRpi_hth8O1-_it4JGvEXReHBHrqWvVq1pI2Vc0d0FHVr2KoErdy0xMhvoU7lqM1GNs_TjP9dzep3YI05GCFU4sjFDuE4IVYLLWYpj5fEqrbfDEOdC6u09S3tRcJvybVrnzUEsitu6X75SSGh-BcVgUCuVnF0jEcoIqHDkOJZKiTbMdJ6ByIK2Zl3EV5K7Tk1i0msHSuR7qdPtY92l9dq6bsCCSibnF-UY",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAU2YrCPI6R461gBgWyEqiA47552-KzNTzZkyKF_6Y6BVv1kjBhcPBiZl1AfWx_j632-h_xpvcEDPD8EwUc5R7mUXhtyo6_IZgjAE4j08UpUUGn1Ev6-ZvTBSrHeh9Nasre12KVtxjJOJQt1dMX2g6O3ARvp3R__Q9pj_1aX8VZDXgOp-MMMmBDSFHm-CUvfHV3Iv04zNoi397Ap2ObBwB1dtJXR3wONEtgKUC1-HeRrWb9Eccfa_mjttvolWpfzgFU0lPXeoU59PA",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBhNu2Ktf420HAwtzpsVI24-nz_VQ3X_CZ4VCvYuiUDvOfz7glZkhOnN0XaGt8zQFrsF5BYMRc0lkSE6tRWqA65-aGtqFs0pv__WGJAZsboM4FI9G8lQloi8nZ4RTaiT1xB0TX5tjHlKL3IP9PUbeyQu7jET1NU0iqMtuKXBCM36S8Plfb6706kT5m9pGZ8-cL1w__tN6D_9B40FVtCTafZgGzUm2wOyxevzh4odnsBa6SEj8Ct_Izt2grW3egcLK-2LZ3YSGK6p3Q",
        ],
        amenities: ["pool", "wifi", "ac_unit", "outdoor_grill"],
        host: {
            name: "Rahul",
            avatar:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuBslPhyOoepIpHbRfTh4r4HmdIKVdLhDU_-p0aiDwSjbg16r0mYYhsc8Tb0Zh0Re2S-Gcvou4rpVkFsPbWFgW5Rb34wIFHb-Lq1JYFVFeZozhSiRhIo9NI_tspVwXugPpYBG40j3fw2jXmxt-Uzwl4i1Dt2iUk3poDQoY8D22EozRQ9yZ5VLhCiIjxBLeueVyI9LNUWopeFLTpCHUf8sZO0Tl8LDuDQCiJ80Ua1K7_dS_pPV-FZe7jr2AG_rcRWqLybXUgzLRgkE6M",
            handle: "@cabin_fever",
            isSuperhost: true,
            joinedYear: 2019,
        },
        guests: 12,
        bedrooms: 5,
        baths: 4,
        type: "Entire Farmhouse",
        tags: ["Mountain View", "Pet Friendly"],
        likes: 12500,
        comments: 342,
        badge: "Popular Stay",
    },
    {
        id: "2",
        name: "The Golden Vineyard Retreat",
        location: "Nashik",
        state: "Maharashtra",
        price: 12000,
        currency: "₹",
        rating: 4.8,
        reviewCount: 96,
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAfo_mIViJGmYAc_VH44Il51sGBNi9onxPBUPO8FGEW4QG44TWdCZZgYYcOZJR9hBJcl8lIghQ3EHhYUqDdfDIwjizCv0RmFbQihubqepvRqAzPzyW7T1_gppn8tq_DFysAFqH-Cs2mbAI6-g2oert5_rnUKShLK2ngOwB7C6zYGrqB4Wl6VoGP1rvyCAH1WAiY0_nKFoRbVyU74NLpDL-oefvvKHFbUkZ9uJlX3z-iNP4A1Ygt8b6LLCijfdAl3ByC-EiaB8-E_L0",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCHXf0aXJePCI1LSgYdzl9LBAQV9hBNW_SXzDRiw-V9_21K1NyjyHEzTxhs4lcAhgWbLAobWZ-6XRhCGbKfr75Fayoe4ikYxulARxX3ktm4eBhZQYwrFLxBN0h_qZFOX9d8nCnT1OsD47OZJW6FA-zBEQ63Ap7gZmawi3367-kbM6MMWjNbfgadEFt6N5JRBMAm1gtAduwjg7MfkJ4MtBjFEKLoFjfF9OodSvMjbaCwKRDPFYRtgvovxbgPavzFByTZg3VDFPeCHIQ",
        ],
        amenities: ["pool", "wifi", "restaurant", "spa"],
        host: {
            name: "Priya",
            avatar:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuDY7DV2nFqpn3Gkq8cNStaeCRgMH6Ds2sJ2ds626OajSf2EuT7nz7_rKKfliopsKIPEfZ1w79XxrDCqMM5uVJN9Ncfgf80GCNPR3j8drZIbt598-jMTQCQ0SH98PLzfuZSyIOX7VEP9zpLlK74RH23-A4LdBXbAdHluhoHrfFOhflI0BvydAsUjniMlAlEw1r12KiShiqQvYRWYtMgZXjwe5yIzWd_vkqrzSef_DYJUhT2Qtk3aC3v6ARQHUTAfJYgrY3Hpf-gZXbQ",
            handle: "@vineyard_vibes",
            isSuperhost: true,
            joinedYear: 2020,
        },
        guests: 8,
        bedrooms: 4,
        baths: 3,
        type: "Villa",
        tags: ["Vineyard", "Luxury"],
        likes: 8900,
        comments: 215,
        badge: "New Arrival",
    },
    {
        id: "3",
        name: "Bamboo Grove Sanctuary",
        location: "Karjat",
        state: "Maharashtra",
        price: 5500,
        currency: "₹",
        rating: 5.0,
        reviewCount: 64,
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAryocLG6qWsEnagjTHNA5Rn8_bAecEgp_mJJNJrLC69pQCJf7zCPTSVpnVB0pMlwJgPgOflo7AhS1WXgLcbvYPPKExcu75dyTdCm3FweHJZ1nJ6PU_eqYGBB7DGOn-RE0wFKoKfz_bXh7U180Z-6QLvJ3hVOBM3ltQM9txiUtYwOoP3MXPj1MmNuZIQLPYIOAEacsiVohTDIHJ3taGP74f-4nHROiakHQF4hA7tdqAgzg1VE0eytLzX-HNGTo6NxX92CuPwBKpIxo",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuA1KruH5kYZhcwYxzS_1QjOJmV_3Inz43lPvUPWDL1Dv3jXTzSjOyjYBo1OrXWNxhNyl-c1SUX5V4kinRx0pqiSARE7f0Byg63ES5dXpyinNeNDtKGGRkcOF3nI1hwpeDxRrV9Kl3F5XZeyfhKuhQY0LKbYveI2UOhgviCdDU7albz59_yUtidJF9NsRJH8aZYpBGRdtwKPSFqtfgkEUYWwR3lqnLZkpic_y0e_vlLuMfsVFWlrPqq8Il92Iwcr18Gh9StqGl1q2V4",
        ],
        amenities: ["eco", "wifi", "restaurant", "pets"],
        host: {
            name: "Amit",
            avatar:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuArXoOU7jV6WKjLyiJSaMVhVQ4V2tyjnAr84T5ytU69Sny85Y8o1KP59w1LWJ2tFP__k3qNUG7PUieFNIipH09JojrR3hMBblX3RVf4WVn5bvHLteEpxugaZZRFHbmxomNXoMcWFYP7l07ml0Psfi7iqHpIQ5MrTd6jg6RZzHBXxrhob4qdtF4BopjkG52ZWgFRl2-bh8weVqbjlcD-mINQrLyDeS-7QmIXrsez5aRyjUHHQTtwXQdBgCJbUUH4mDPNbPTJwI-XHvw",
            handle: "@eco_farmer",
            isSuperhost: false,
            joinedYear: 2022,
        },
        guests: 6,
        bedrooms: 3,
        baths: 2,
        type: "Eco Farmhouse",
        tags: ["Eco-Certified", "Organic"],
        likes: 24000,
        comments: 440,
        badge: "Eco-Certified",
    },
    {
        id: "4",
        name: "Alpine Peak Ranch",
        location: "Manali",
        state: "Himachal Pradesh",
        price: 15000,
        currency: "₹",
        rating: 4.8,
        reviewCount: 82,
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAhl5pnhE1IUAA3jyQzFT4xahRNt6KbrYet6KgzEXnz6D1bt8EntJQkQ4EHEYqZvSYFY3WGUihnrChw5Y8LgF5CcZdTXY_g7KVey5zZXRO16NMpav0CUzh8OtJ2f1d92xEP2C0cjRttlf6_iFMgz6CF9ZbXInM5hvcXnsZeElIJLlHwh_Lf8d-4QUzF8_vRDYv1g5Bi2mLoN6lCaG4eLVB9gwyfBrBOu4Xh85ov-p9mwzXExzOqoYAKKWs7SzrOxB2oOwABTUlVzdA",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBYGE9c1Hxy8CeXldeagypAxp3RytotckWEoQh3Q7J0IXfBLlSzExK-oyZXLfSrWY1AMNj3mzSn3t6U7Zhh_OjTTzEPkl86t01rTczuoPpVkjMgUMTTtbIhDn5IBDpYYThdLUDshcGHdnpCRjlv0FvHJHhPmXn9imDHPGgVPAtIB6QPItlpLjxsn6XIN2_JyRydW6zjK83nvtIQykQirwe88mlhFauBPDXMR7HzJo8EK2Lj8VtFjqHyiYXWcToksCBBUyuvd-mV4YQ",
        ],
        amenities: ["fireplace", "wifi", "mountain_view", "hot_tub"],
        host: {
            name: "Vikram",
            avatar:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuBdFXMUvxe--h4MC3oW2OZ6CR3XBnjoqwInUFIyemhYhxLzv0M-dHzGs-wvkpMgCBbBatZpulW8GvTxVajHuHtVS-KkmNe51MLSCgDIvTtH9G7YSBZYvn21Nfc0aPprBFSoIuE-zUcutggRFXpZCvvlUcGM_dik6YjcCm9B337I7sLuYFQwMSZYdtWGx8S5Cmnp9lwZiasqlW05Wh9KF9kNHSkCR_3qkLUhC15gU2xp8tg3YFaOY1-asU02sIio5XaOcwMJ9peWelI",
            handle: "@mountain_man",
            isSuperhost: true,
            joinedYear: 2018,
        },
        guests: 10,
        bedrooms: 4,
        baths: 3,
        type: "Ranch",
        tags: ["Mountain", "Luxury"],
        likes: 6800,
        comments: 180,
    },
    {
        id: "5",
        name: "The Rustic Orchard",
        location: "Alibaug",
        state: "Maharashtra",
        price: 9500,
        currency: "₹",
        rating: 4.7,
        reviewCount: 112,
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCLXxdJbG6D6ELsG6xb6NsSGg33O3bhnupIzmbqj9zDagT-97dgPyuaL_iLpKcnWeGal-dcPOTB9wm8NwjgOhnTjCLYaeUjVxpQS808hx4Q9b6gfYRxH-WSF5nStAdVLxoHbquidVl12lz-oylYdgDjWq8B929HzEpeJUmv4fBsS4NhkYcxCRkQ7dmR3wYaFt5ZvzwOZa3SalGiE5C2WnUwOi7iNCXd5cMatLp9QM6pfTxxt1gls-DCjAumYLkNz8Rd-75EalFgdCA",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDDUfHoQWYQ1kKGwpnLL4L73HCSRy3sekflVvSwofXyJLplcZKk14sR3TMcj0K92u7Y11rUJQjNLnoa1N75ybrBO91TSL1Vxb_mBXxH1wGqTJICN-4MMCWUWvDX4sa0hRLKbR4OOO2J6gvfcu9hkAC7HOJeqhseXBJLOfQwyrTDxyyGE6VjkDFVeD7cRMnj5Aobq5EDMJM16BYS4JDKNeSGL3-6lcn1ddr7tyxQimWs7T2qw8XyBc9tBKlp_bzKbIkTP5O4vOp-RH8",
        ],
        amenities: ["pool", "wifi", "outdoor_grill", "garden"],
        host: {
            name: "Sneha",
            avatar:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuBKcQvsHn_tRK9FbE_4y-oHsorHzHJ9EwQVkV_aDWZ5YQfVZBtKUHNqNYlFlQE1_OArPpU75T98n9V2zUhc8UnMA-a8eZBwPM6cUGau56Wi98F6YY5cABMWj4yWsWsJy6HE0H4mwOxUocU_ZSx0zrMCzhF9cks5G-sme8Od6aSnR6lAkf-7KpDBkQa6nWOuu4tLE1Z6Z9efXebKMvAJoQAPEPFbw3rxavuzF4fz3d67H6o6iCSz4PLLdiqMIXKECmX35oVCa7AYBBQ",
            handle: "@orchard_queen",
            isSuperhost: false,
            joinedYear: 2021,
        },
        guests: 8,
        bedrooms: 3,
        baths: 2,
        type: "Farmhouse",
        tags: ["Beach Nearby", "Family"],
        likes: 5200,
        comments: 98,
    },
    {
        id: "6",
        name: "Sunset Villa Estate",
        location: "Goa",
        state: "Goa",
        price: 18000,
        currency: "₹",
        rating: 4.9,
        reviewCount: 204,
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuB0drjj8WSzQn3JQQbBv_lHRjtSTBg5PYM9m0yER1xmqoVvYiHO_2AsxjG8JFU25I5UkRz7KpkPqeD-vzmRsFHWA4VocR7MGM3D93aw3hlcRqRrDGa69cBCM0aJE5zQwfrBSIYwLA9EH0emBqQu-68jrENrZIWMdpjk3DHdhYJDzRI4XGrxabQrQwLvKAQ35-3mOCgfV5d_3X4G2p2qta7BqH1BeiU7DhsEI_X1Tmym0E2IZedcXsr5ucLGH5ZXoAnp9kEu45CghWQ",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuA6T7M3DGn8mz0elkV_bHpsE6LvLMvd-iTVfm6Sah0kcW8nz-Yz2RN5wiIkQB5etT-aUjgXle_PgCe4g_6rM5joNX0S6I9sOFkiS1Mg-pxzycHtWPjT-eN_T32qTv4S8OcIDVHdV7_9WYXtl_h0aN801wavv1QI8hXAT4fz33LHxU0bV3lhiGwld3rqHpytebQPcPrq37pRhJc4yKZZwZjoD0fTD1VXtzUMD4ezHE1kFkShe0AKwtbMHHVXcs8yrA8SEGVlojIPpy0",
        ],
        amenities: ["pool", "wifi", "spa", "restaurant"],
        host: {
            name: "Carlos",
            avatar:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuAxttsa0emg8ujm287LFGIr6mVEAZHaoLELhja6JR4Hbd-7kxGIBkcRhYBWQ9MEGgXxazsb5slIrJLda-29zKgvCf80YFzd_95lUeVl0GPc7mT0G9n8E8aDts3SYrR9pMcbvuJ9iclVK5ANSd8FqtImyOzriRHEVpY-sOhVxg010sx6Lho7EXFuk76oCi0cAB-ayudvZdyILpjbMtvMgBQG8lRzo5MeeZO4cKrhyXxprzkTryywrGkfgiHz9y1BEUyDvY_Am20_A8E",
            handle: "@sunset_carlos",
            isSuperhost: true,
            joinedYear: 2017,
        },
        guests: 16,
        bedrooms: 6,
        baths: 5,
        type: "Villa",
        tags: ["Vineyard View", "Luxury"],
        likes: 15200,
        comments: 520,
        badge: "Top Rated",
    },
];

export function formatPrice(price: number, currency: string = "₹"): string {
    if (price >= 1000) {
        return `${currency}${(price / 1000).toFixed(price % 1000 === 0 ? 0 : 1)}k`;
    }
    return `${currency}${price}`;
}

export function formatLikes(count: number): string {
    if (count >= 1000) {
        return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
}
