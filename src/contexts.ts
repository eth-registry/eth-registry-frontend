import { createContext } from 'react';

import { Schemas } from './types/Schemas';
import EthRegistry from './helpers/registry.js';

export const registry = new EthRegistry(null);

export const ActiveFormContext = createContext(Schemas.GENERIC);

export const EditAddressContext = createContext('');



