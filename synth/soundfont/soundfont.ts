// WORD: Uint16
// DWORD: Uint32
// CHAR: int8

// Important document for anyone trying to decipher what this is doing: https://www.synthfont.com/SFSPEC21.PDF
// Page 7 denotes data types, page 16 gives an overview to the whole structure
// Soundfonts use the RIFF file structure.

import { Dictionary, performIntegral } from "../SynthConfig"

enum sampleMode { //loop types
    noLoop,
    continuousLoop,
    unused,
    loopUntilEnd,
}

enum GeneratorCombination {
    additive,
    range, 
    substitution,
    sampleOffset,
    sampleMode,
    sampleRootKey,
    exclusiveClass,
    index,
    reserved,
    link,
    override,
    none,
}

enum ParseType {
    Uint16,
    Int16,
    Range,
}

export const GENERATORS: Dictionary<GeneratorDef> = {
    startAddrsOffset:           { op: 0,  presetAllowed: false, instrumentAllowed: true,  type: GeneratorCombination.sampleOffset, defaultValue: 0,     parseType: ParseType.Int16 },
    endAddrsOffset:             { op: 1,  presetAllowed: false, instrumentAllowed: true,  type: GeneratorCombination.sampleOffset, defaultValue: 0,     parseType: ParseType.Int16 },
    startloopAddrsOffset:       { op: 2,  presetAllowed: false, instrumentAllowed: true,  type: GeneratorCombination.sampleOffset, defaultValue: 0,     parseType: ParseType.Int16 },
    endloopAddrsOffset:         { op: 3,  presetAllowed: false, instrumentAllowed: true,  type: GeneratorCombination.sampleOffset, defaultValue: 0,     parseType: ParseType.Int16 },
    startAddrsCoarseOffset:     { op: 4,  presetAllowed: false, instrumentAllowed: true,  type: GeneratorCombination.sampleOffset, defaultValue: 0,     parseType: ParseType.Int16 },
    modLfoToPitch:              { op: 5,  presetAllowed: true,  instrumentAllowed: true,  type: GeneratorCombination.additive,    defaultValue: 0,     parseType: ParseType.Int16 },
    vibLfoToPitch:              { op: 6,  presetAllowed: true,  instrumentAllowed: true,  type: GeneratorCombination.additive,    defaultValue: 0,     parseType: ParseType.Int16 },
    modEnvToPitch:              { op: 7,  presetAllowed: true,  instrumentAllowed: true,  type: GeneratorCombination.additive,    defaultValue: 0,     parseType: ParseType.Int16 },
    initialFilterFc:            { op: 8,  presetAllowed: true,  instrumentAllowed: true,  type: GeneratorCombination.override,    defaultValue: 13500, parseType: ParseType.Int16 },
    initialFilterQ:             { op: 9,  presetAllowed: true,  instrumentAllowed: true,  type: GeneratorCombination.additive,    defaultValue: 0,     parseType: ParseType.Int16 },
    modLfoToFilterFc:            { op: 10, presetAllowed: true,  instrumentAllowed: true,  type: GeneratorCombination.additive,    defaultValue: 0,     parseType: ParseType.Int16 },
    modEnvToFilterFc:            { op: 11, presetAllowed: true,  instrumentAllowed: true,  type: GeneratorCombination.additive,    defaultValue: 0,     parseType: ParseType.Int16 },
    endAddrsCoarseOffset:       { op: 12, presetAllowed: false, instrumentAllowed: true,  type: GeneratorCombination.sampleOffset, defaultValue: 0,     parseType: ParseType.Int16 },
    modLfoToVolume:             { op: 13, presetAllowed: true,  instrumentAllowed: true,  type: GeneratorCombination.additive,    defaultValue: 0,     parseType: ParseType.Int16 },
    unused1:                    { op: 14, presetAllowed: false, instrumentAllowed: false, type: GeneratorCombination.none,         defaultValue: 0,     parseType: ParseType.Uint16 },
    chorusEffectsSend:          { op: 15, presetAllowed: true,  instrumentAllowed: true,  type: GeneratorCombination.additive,    defaultValue: 0,     parseType: ParseType.Int16 },
    reverbEffectsSend:          { op: 16, presetAllowed: true,  instrumentAllowed: true,  type: GeneratorCombination.additive,    defaultValue: 0,     parseType: ParseType.Int16 },
    pan:                        { op: 17, presetAllowed: true,  instrumentAllowed: true,  type: GeneratorCombination.additive,    defaultValue: 0,     parseType: ParseType.Int16 },
    unused2:                    { op: 18, presetAllowed: false, instrumentAllowed: false, type: GeneratorCombination.none,         defaultValue: 0,     parseType: ParseType.Uint16 },
    unused3:                    { op: 19, presetAllowed: false, instrumentAllowed: false, type: GeneratorCombination.none,         defaultValue: 0,     parseType: ParseType.Uint16 },
    unused4:                    { op: 20, presetAllowed: false, instrumentAllowed: false, type: GeneratorCombination.none,         defaultValue: 0,     parseType: ParseType.Uint16 },
    delayModLFO:                { op: 21, presetAllowed: true,  instrumentAllowed: true,  type: GeneratorCombination.override,    defaultValue: -12000, parseType: ParseType.Int16 },
    freqModLFO:                 { op: 22, presetAllowed: true,  instrumentAllowed: true,  type: GeneratorCombination.override,    defaultValue: 0,     parseType: ParseType.Int16 },
    delayVibLFO:                { op: 23, presetAllowed: true,  instrumentAllowed: true,  type: GeneratorCombination.override,    defaultValue: -12000, parseType: ParseType.Int16 },
    freqVibLFO:                 { op: 24, presetAllowed: true,  instrumentAllowed: true,  type: GeneratorCombination.override,    defaultValue: 0,     parseType: ParseType.Int16 },
    delayModEnv:                { op: 25, presetAllowed: true,  instrumentAllowed: true,  type: GeneratorCombination.override,    defaultValue: -12000, parseType: ParseType.Int16 },
    attackModEnv:               { op: 26, presetAllowed: true,  instrumentAllowed: true,  type: GeneratorCombination.override,    defaultValue: -12000, parseType: ParseType.Int16 },
    holdModEnv:                 { op: 27, presetAllowed: true,  instrumentAllowed: true,  type: GeneratorCombination.override,    defaultValue: -12000, parseType: ParseType.Int16 },
    decayModEnv:                { op: 28, presetAllowed: true,  instrumentAllowed: true,  type: GeneratorCombination.override,    defaultValue: -12000, parseType: ParseType.Int16 },
    sustainModEnv:              { op: 29, presetAllowed: true,  instrumentAllowed: true,  type: GeneratorCombination.override,    defaultValue: 0,     parseType: ParseType.Uint16 },
    releaseModEnv:              { op: 30, presetAllowed: true,  instrumentAllowed: true,  type: GeneratorCombination.override,    defaultValue: -12000, parseType: ParseType.Int16 },
    keynumToModEnvHold:         { op: 31, presetAllowed: true,  instrumentAllowed: true,  type: GeneratorCombination.additive,    defaultValue: 0,     parseType: ParseType.Int16 },
    keynumToModEnvDecay:        { op: 32, presetAllowed: true,  instrumentAllowed: true,  type: GeneratorCombination.additive,    defaultValue: 0,     parseType: ParseType.Int16 },
    delayVolEnv:                { op: 33, presetAllowed: true,  instrumentAllowed: true,  type: GeneratorCombination.override,    defaultValue: -12000, parseType: ParseType.Int16 },
    attackVolEnv:               { op: 34, presetAllowed: true,  instrumentAllowed: true,  type: GeneratorCombination.override,    defaultValue: -12000, parseType: ParseType.Int16 },
    holdVolEnv:                 { op: 35, presetAllowed: true,  instrumentAllowed: true,  type: GeneratorCombination.override,    defaultValue: -12000, parseType: ParseType.Int16 },
    decayVolEnv:                { op: 36, presetAllowed: true,  instrumentAllowed: true,  type: GeneratorCombination.override,    defaultValue: -12000, parseType: ParseType.Int16 },
    sustainVolEnv:              { op: 37, presetAllowed: true,  instrumentAllowed: true,  type: GeneratorCombination.override,    defaultValue: 0,     parseType: ParseType.Int16 },
    releaseVolEnv:              { op: 38, presetAllowed: true,  instrumentAllowed: true,  type: GeneratorCombination.override,    defaultValue: -12000, parseType: ParseType.Int16 },
    keynumToVolEnvHold:         { op: 39, presetAllowed: true,  instrumentAllowed: true,  type: GeneratorCombination.additive,    defaultValue: 0,     parseType: ParseType.Int16 },
    keynumToVolEnvDecay:        { op: 40, presetAllowed: true,  instrumentAllowed: true,  type: GeneratorCombination.additive,    defaultValue: 0,     parseType: ParseType.Int16 },
    instrument:                 { op: 41, presetAllowed: true,  instrumentAllowed: false, type: GeneratorCombination.link,         defaultValue: 0,     parseType: ParseType.Uint16 },
    reserved1:                  { op: 42, presetAllowed: false, instrumentAllowed: false, type: GeneratorCombination.none,         defaultValue: 0,     parseType: ParseType.Uint16 },
    keyRange:                   { op: 43, presetAllowed: true,  instrumentAllowed: true,  type: GeneratorCombination.range,        defaultValue: 32512, parseType: ParseType.Range },
    velRange:                   { op: 44, presetAllowed: true,  instrumentAllowed: true,  type: GeneratorCombination.range,        defaultValue: 32512, parseType: ParseType.Range },
    startloopAddrsCoarseOffset: { op: 45, presetAllowed: false, instrumentAllowed: true,  type: GeneratorCombination.sampleOffset, defaultValue: 0,     parseType: ParseType.Int16 },
    keynum:                     { op: 46, presetAllowed: false, instrumentAllowed: true,  type: GeneratorCombination.override,    defaultValue: -1,    parseType: ParseType.Int16 },
    velocity:                   { op: 47, presetAllowed: false, instrumentAllowed: true,  type: GeneratorCombination.override,    defaultValue: -1,    parseType: ParseType.Int16 },
    initialAttenuation:         { op: 48, presetAllowed: true,  instrumentAllowed: true,  type: GeneratorCombination.additive,    defaultValue: 0,     parseType: ParseType.Int16 },
    reserved2:                  { op: 49, presetAllowed: false, instrumentAllowed: false, type: GeneratorCombination.none,         defaultValue: 0,     parseType: ParseType.Uint16 },
    endloopAddrsCoarseOffset:   { op: 50, presetAllowed: false, instrumentAllowed: true,  type: GeneratorCombination.sampleOffset, defaultValue: 0,     parseType: ParseType.Int16 },
    coarseTune:                 { op: 51, presetAllowed: true,  instrumentAllowed: true,  type: GeneratorCombination.additive,    defaultValue: 0,     parseType: ParseType.Int16 },
    fineTune:                   { op: 52, presetAllowed: true,  instrumentAllowed: true,  type: GeneratorCombination.additive,    defaultValue: 0,     parseType: ParseType.Int16 },
    sampleID:                   { op: 53, presetAllowed: false, instrumentAllowed: true,  type: GeneratorCombination.link,         defaultValue: 0,     parseType: ParseType.Uint16 },
    sampleModes:                { op: 54, presetAllowed: false, instrumentAllowed: true,  type: GeneratorCombination.override,    defaultValue: 0,     parseType: ParseType.Uint16 },
    reserved3:                  { op: 55, presetAllowed: false, instrumentAllowed: false, type: GeneratorCombination.none,         defaultValue: 0,     parseType: ParseType.Uint16 },
    scaleTuning:                { op: 56, presetAllowed: true,  instrumentAllowed: false, type: GeneratorCombination.override,    defaultValue: 100,   parseType: ParseType.Int16 },
    exclusiveClass:             { op: 57, presetAllowed: false, instrumentAllowed: true,  type: GeneratorCombination.override,    defaultValue: 0,     parseType: ParseType.Uint16 },
    overridingRootKey:          { op: 58, presetAllowed: false, instrumentAllowed: true,  type: GeneratorCombination.override,    defaultValue: 65535, parseType: ParseType.Uint16 },
    unused5:                    { op: 59, presetAllowed: false, instrumentAllowed: false, type: GeneratorCombination.none,         defaultValue: 0,     parseType: ParseType.Uint16 },
    endOper:                    { op: 60, presetAllowed: false, instrumentAllowed: false, type: GeneratorCombination.none,         defaultValue: 0,     parseType: ParseType.Uint16 },
} as const;

interface GeneratorDef {
    op: number,
    presetAllowed: boolean,
    instrumentAllowed: boolean,
    type: GeneratorCombination,
    defaultValue: number,
    parseType:ParseType,
}

interface Instrument {
    name: string,
    minPitch: number,
    maxPitch: number,
    globalGens: Generator[],
    instrumentZones: InstrumentZone[],
}

interface Preset {
    name: string;
    minPitch: number
    maxPitch: number
    globalGens: Generator[],
    presetZones: PresetZone[];
}

interface InstrumentZone {
    minPitch: number,
    maxPitch: number,
    sampleIndex: number,
    loopType: sampleMode,
    gens: Generator[],
}

interface PresetZone {
    minPitch: number,
    maxPitch: number,
    instrument: Instrument,
    gens: Generator[],
}

interface SampleInfo {
    name: string,
    index: number,
    sampleStart: number,
    sampleEnd: number,
    loopStart: number,
    loopEnd: number,
    sampleRate: number,
    originalPitch: number,
    pCorrection: number;
}

interface Bag {
    genIndex: number
    modIndex: number
}

interface Generator {
    op: number
    amt: number
}

interface TypeInfo {
    name: string,
    bagIndex: number,
}

export interface InstGenerators {
    gens: Generator[],
}

export interface PresetGenerators {
    gens: Generator[],
    instGenerators: InstGenerators[],
}

interface PHDR extends TypeInfo { //these are just for organization
}

interface INST extends TypeInfo {
}

export class Soundfont {
    public readonly url: string;
    public readonly name: string;
    public readonly chipWaves: Float32Array[];
    public readonly rawChipWaves: Float32Array[];
    public readonly rawRawChipWaves: Float32Array[];
    public readonly presets: Preset[];
    public readonly success: Boolean;
    public readonly sampleInfo: SampleInfo[];

    public static readonly soundfontURLS: Array<string> = [
        //"https://file.garden/ZxBw28OpLwxBlXVc/Bluegrass_Banjo.sf2",
        //"https://file.garden/ZxBw28OpLwxBlXVc/SRX_Acoustic_Bass.sf2",
        //"https://dl.dropboxusercontent.com/scl/fi/5dgonx0uhlasjwxlkgy00/CTinstruments.sf2?rlkey=4fhyvithjjxjyliy7lrilmrym&st=450mbyf8&dl=0",
        //"https://dl.dropboxusercontent.com/scl/fi/9cbprbhg6r64ltdt0cwwl/SC-55.sf2?rlkey=2wx9joy8eoqj1l8zamhld3n7a&st=yydmwjj2&dl=0",
    ];

    public static readonly loadedSoundfonts: Array<Soundfont> = [
    ];

    //For loading purposes
    public static placeholderSoundfont(): Soundfont {
        let presets: Preset[] = [{
            name: "Loading...",
            presetZones: [],
            globalGens: [],
            minPitch: 0,
            maxPitch: 0,
        }];
        
        return new Soundfont("Loading...", presets, [], [], [], [], "", false);
    }

    //TODO: make the doc parameter not any, right now its a circular dependancy
    public static async loadSoundfont(url: string, sfIndex: number, doc: any): Promise<Soundfont> {
        return fetch(url).then((response) => {
            //console.log("Fetching "+url+"...");
            if (!response.ok) {
                return Promise.reject(new Error("Couldn't load sf2."));
            }
            return response.arrayBuffer();
        }).then((arrayBuffer) => {
            //console.log("Loading "+url+". Size of data: " + arrayBuffer.byteLength + " bytes.");
            let name: string = "";
            let presets: Preset[] = [];
            let buffer = new Uint8Array(arrayBuffer);
            let rawSample: Float32Array = new Float32Array;
            let intSample: Float32Array = new Float32Array;

            // RIFF parser
            const decoder = new TextDecoder('ascii');
            const chipWaves: Float32Array[] = [];
            const rawChipWaves: Float32Array[] = [];
            const rawRawChipWaves: Float32Array[] = [];
            const view = new DataView(buffer.buffer);
            const sampleInfo: SampleInfo[] = [];
            const pbag: Bag[] = [];
            const ibag: Bag[] = [];
            const pgen: Generator[] = [];
            const igen: Generator[] = [];
            const phdr: PHDR[] = [];
            const inst: INST[] = [];
            let recordCount = 0;
            let currRecord = 0;
            let currByte = 0;
            let postByte = currByte + 8;
            let id: string;
            let size: number;
            while (currByte + 8 <= buffer.length) {
                postByte = currByte + 8;
                id = decoder.decode(buffer.subarray(currByte, currByte + 4));
                size = view.getUint32(currByte + 4, true);

                switch (id) {
                    //all the stuff we wanna skip over. could be coded better but lmao
                    case 'LIST': case 'RIFF':
                        currByte += 12;
                        break;

                    case 'ifil': case 'isng': case 'irom': case 'iver': case 'ICRD': case 'IENG': case 'IPRD': case 'ICOP': case 'ICMT': case 'ISFT': case 'pmod': case 'imod':
                        currByte += 8 + size + (size % 2);
                        break;

                    case 'INAM': // Name of soundbank
                        name = decoder.decode(buffer.subarray(postByte, postByte + size)).replace(/\0+$/, "");
                        currByte += 8 + size + (size % 2);
                        break;
                    
                    case 'pbag': // Holds generators and modulators
                        recordCount = Math.floor(size / 4);
                        currRecord = 0;
                        while (currRecord < recordCount) {
                            const recLocation = (currRecord * 4) + postByte;
                            pbag.push({
                                genIndex: view.getUint16(recLocation, true),
                                modIndex: view.getUint16(recLocation + 2, true),
                            });  
                            currRecord++;
                        }
                        currByte += 8 + size + (size % 2);
                        break;

                    case 'ibag':
                        recordCount = Math.floor(size / 4);
                        currRecord = 0;
                        while (currRecord < recordCount) {
                            const recLocation = (currRecord * 4) + postByte;
                            ibag.push({
                                genIndex: view.getUint16(recLocation, true),
                                modIndex: view.getUint16(recLocation + 2, true),
                            });
                            currRecord++;
                        }
                        currByte += 8 + size + (size % 2);
                        break;

                    case 'pgen': // Operators and amounts
                        recordCount = Math.floor(size / 4);
                        currRecord = 0;
                        while (currRecord < recordCount) {
                            const recLocation = (currRecord * 4) + postByte;
                            const op = view.getUint16(recLocation, true)
                            const genDef = this.getDefFromGenerator({op: op, amt: 0});
                            let amt: number;
                            if (!genDef) {
                                currRecord++;
                                continue;
                            }
                            if (genDef.parseType == ParseType.Int16) {
                                amt = view.getInt16(recLocation + 2, true);
                            } else {
                                amt = view.getUint16(recLocation + 2, true);
                            }
                            pgen.push({
                                op: op,
                                amt: amt,
                            });
                            currRecord++;
                        }
                        currByte += 8 + size + (size % 2);
                        break;

                    case 'igen':
                        recordCount = Math.floor(size / 4);
                        currRecord = 0;
                        while (currRecord < recordCount) {
                            const recLocation = (currRecord * 4) + postByte;
                            const op = view.getUint16(recLocation, true)
                            const genDef = this.getDefFromGenerator({op: op, amt: 0});
                            let amt: number;
                            if (!genDef) {
                                currRecord++;
                                continue;
                            }
                            if (genDef.parseType == ParseType.Int16) {
                                amt = view.getInt16(recLocation + 2, true);
                            } else {
                                amt = view.getUint16(recLocation + 2, true);
                            }
                            igen.push({
                                op: op,
                                amt: amt,
                            });
                            currRecord++;
                        }
                        currByte += 8 + size + (size % 2);
                        break;

                    case 'inst': // Instrument info
                        recordCount = Math.floor(size / 22)
                        currRecord = 0;
                        while (currRecord < recordCount) {
                            const recLocation = (currRecord * 22) + postByte;
                           inst.push({
                                name: decoder.decode(buffer.subarray(recLocation, recLocation + 20)).split('\0')[0],
                                bagIndex: view.getUint16(recLocation + 20, true),
                            });
                            currRecord++;
                        }
                        currByte += 8 + size + (size % 2);
                        break;

                    case 'phdr': // Preset info
                        recordCount = Math.floor(size / 38); // Each preset is 38 bytes
                        currRecord = 0;
                        while (currRecord < recordCount) {
                            const recLocation = (currRecord * 38) + postByte;
                            phdr.push({
                                name: decoder.decode(buffer.subarray(recLocation, recLocation + 20)).split('\0')[0],
                                bagIndex: view.getUint16(recLocation + 24, true),
                            });
                            currRecord++;
                        }
                        currByte += 8 + size + (size % 2);
                        break;

                    case 'shdr': // Sample info
                        recordCount = Math.floor(size / 46) // Each sample is 46 bytes
                        currRecord = 0;
                        while (currRecord < recordCount) {
                            const recLocation = (currRecord * 46) + postByte;
                            sampleInfo.push({
                                name: decoder.decode(buffer.subarray(recLocation, recLocation + 20)).split('\0')[0],
                                sampleStart: view.getUint32(recLocation + 20, true),
                                sampleEnd: view.getUint32(recLocation + 24, true),
                                loopStart: view.getUint32(recLocation + 28, true) - view.getUint32(recLocation + 20, true), //we do this to get the relative position of the loop rather than the position in the entire sample chunk
                                loopEnd: view.getUint32(recLocation + 32, true) - view.getUint32(recLocation + 20, true),
                                sampleRate: view.getUint32(recLocation + 36, true),
                                originalPitch: view.getUint8(recLocation + 40),
                                pCorrection: view.getInt8(recLocation + 41),
                                index: currRecord,
                            });
                            currRecord++;
                        }
                        currByte += 8 + size + (size % 2);
                        break;
                    
                    case 'smpl': // Raw sample data
                        const samples: Float32Array = new Float32Array(Math.floor(size / 2));
                        for (let i = 0; i < samples.length; i++) {
                            samples[i] = (view.getInt16(postByte + i * 2, true) / 32768);
                        }
                        rawSample = centerWave(samples);
                        intSample = performIntegral(rawSample);
                        currByte += 8 + size + (size % 2);
                        break;

                    default:
                        return Promise.reject("Bad SF2 file.");
                }
                
            }

            const presetList = phdr.slice(); // Remove terminator entries
            const instrumentList = inst.slice();
            presetList.pop();
            instrumentList.pop();
            
            //Construct samples from info
            for (let sample of sampleInfo) {
                chipWaves[sample.index] = rawSample.subarray(sample.sampleStart, sample.sampleEnd);
                rawChipWaves[sample.index] = intSample.subarray(sample.sampleStart, sample.sampleEnd);
                //rawRawChipWaves[sample.index] = intSample.subarray(sample.sampleStart, sample.sampleEnd); no need for this yet, only serves to eat memory
            }

            //Construct instruments:
            const instruments: Instrument[] = [];
            let index = 0;
            for (let instrument of instrumentList) {
                const bagRange: number[] = this.getBagRange(index, inst);
                const globalGens: Generator[] = this.getGlobalInstrumentGenerators(ibag, igen, instrument);
                const global: number = (globalGens.length > 0) ? 1 : 0;
                const minPitch = this.getKeyRange(globalGens)[0];
                const maxPitch = this.getKeyRange(globalGens)[1];
                const instrumentZones: InstrumentZone[] = [];
                for (let i = bagRange[0] + global; i < bagRange[1]; i++) {
                    const zoneGens = this.getInstrumentBagGenerators(ibag, igen, i);
                    /*console.log({
                        isGlobal: global,
                        zoneGens: zoneGens,
                        ibag: ibag,
                        igen: igen,
                    });*/
                    const mnPitch = this.getKeyRange(zoneGens)[0];
                    const mxPitch = this.getKeyRange(zoneGens)[1];
                    const sampleIndex = this.getGensOfType(zoneGens, GENERATORS.sampleID.op)[0];
                    const loopType = this.getGensOfType(zoneGens, GENERATORS.sampleModes.op);
                    instrumentZones.push({
                        minPitch: mnPitch,
                        maxPitch: mxPitch,
                        sampleIndex: sampleIndex,
                        gens: zoneGens,
                        loopType: (loopType.length > 0) ? loopType[0] : 0,  
                    });
                }
                instruments.push({
                    name: instrument.name,
                    minPitch: minPitch,
                    maxPitch: maxPitch,
                    globalGens: globalGens,
                    instrumentZones: instrumentZones,
                });
                index++;
            }

            //Construct presets:
            index = 0;
            for (let preset of presetList) {
                const bagRange: number[] = this.getBagRange(index, phdr);   
                const globalGens: Generator[] = this.getGlobalPresetGenerators(pbag, pgen, preset);
                const global: number = (globalGens.length > 0) ? 1 : 0;
                const minPitch = this.getKeyRange(globalGens)[0];
                const maxPitch = this.getKeyRange(globalGens)[1];
                const presetZones: PresetZone[]  = [];
                for (let i = bagRange[0] + global; i < bagRange[1]; i++) {
                    const zoneGens = this.getPresetBagGenerators(pbag, pgen, i);
                    const mnPitch = this.getKeyRange(zoneGens)[0];  
                    const mxPitch = this.getKeyRange(zoneGens)[1];
                    const instIndex = this.getGensOfType(zoneGens, GENERATORS.instrument.op)[0];
                    const instrument = instruments[instIndex];
                    presetZones.push({
                        minPitch: mnPitch,
                        maxPitch: mxPitch,
                        instrument: instrument,
                        gens: zoneGens,
                    });
                }
                presets.push({
                    name: preset.name,
                    minPitch: minPitch,
                    maxPitch: maxPitch,
                    globalGens: globalGens,
                    presetZones: presetZones,
                });
                index++;
            }

            //Construct soundfont from data
            const success = new Soundfont(name, presets, chipWaves, rawChipWaves, rawRawChipWaves, sampleInfo, url, true);
            this.loadedSoundfonts[sfIndex] = success;
            //console.log("Loading successful!: ", success);
            
            // TODO: Make this a bit more specific
            doc.notifier.changed();
            return success;
        });
    }

    private static getBagRange(instIndex: number, list: TypeInfo[]): number[] {
        return [list[instIndex].bagIndex, list[instIndex + 1].bagIndex];
    }

    private static getGlobalInstrumentGenerators(bags: Bag[], gens: Generator[], instrumentInfo: INST): Generator[] {
        let generators: Generator[] = [];
        let start = bags[instrumentInfo.bagIndex].genIndex;
        let end = bags[instrumentInfo.bagIndex + 1].genIndex;

        for (let i = start; i < end; i++) {
            generators.push(gens[i]);
        }

        if (!generators.find((gen) => gen.op == GENERATORS.sampleID.op)) { //global zones are those which dont have one
            generators.push({op: 0, amt: 0}); //this will break if we have no generators with a global zone. kind of a hacky solution but lmao
            return generators;
        } else {
            return [];
        }
    }

    private static getGlobalPresetGenerators(bags: Bag[], gens: Generator[], presetInfo: PHDR): Generator[] {
        let generators: Generator[] = [];
        let start = bags[presetInfo.bagIndex].genIndex
        let end = bags[presetInfo.bagIndex + 1].genIndex;

        for (let i = start; i < end; i++) {
            generators.push(gens[i]);
        }

        if (!generators.find((gen) => gen.op == GENERATORS.instrument.op)) { //same here
            generators.push({op: 0, amt: 0});
            return generators;
        } else {
            return [];
        }
    }

    private static getPresetBagGenerators(bags: Bag[], gens: Generator[], bagIndex: number): Generator[] {
        const genResult: Generator[] = [];
        const start = bags[bagIndex].genIndex;
        const end = bags[bagIndex + 1].genIndex;
        
        for (let i = start; i < end; i++) {
            genResult.push(gens[i]);
        }
        
        return genResult;
    }

    private static getInstrumentBagGenerators(bags: Bag[], gens: Generator[], bagIndex: number): Generator[] {
        const genResult: Generator[] = [];
        const start = bags[bagIndex].genIndex;
        const end = bags[bagIndex + 1].genIndex;

        for (let i = start; i < end; i++) {
            genResult.push(gens[i]);
        }

        return genResult;
    }

    private static getKeyRange(instGens: Generator[]): number[] { //minimum and maximum respectively
        let keyRangeGen = this.getGensOfType(instGens, GENERATORS.keyRange.op);
        if (keyRangeGen.length > 0) {
            let gen = keyRangeGen[0]; //will only be one in the array if it exists
            let high = (gen >>> 8) & 0xFF;
            let low = gen & 0xFF;
            return [low, high];
        } else {
            return [0, 127]; //default to all pitches
        }
    }

    private static getGensOfType(instGens: Generator[], op: number): number[] { //returns array of amounts
        let result: number[] = [];
        for (const g of instGens) {
            if (!g) continue;
            if (g.op == op) {
                result.push(g.amt);
            }
        }
        return result;
    }

    private static getGenDef(gen: Generator): GeneratorDef {
        for (const presetGen in GENERATORS) {
            if (GENERATORS[presetGen].op == gen.op) {
                return GENERATORS[presetGen];
            }
        }
        return GENERATORS.unused;
    }

    private static getRangeTypeValues(amt: number): number[] {
        let high = (amt >>> 8) & 0xFF;
        let low = amt & 0xFF;
        return [low, high];
    }

    private static setRangeTypeValues(gen: Generator, range: number[]): void {
        let encoded = ((range[1] & 0xFF) << 8) | (range[0] & 0xFF);
        gen.amt = encoded;
    }

    public static getAllPresetSamples(soundfontIndex: number, presetIndex: number): number[] {
        const waves: number[] = [];
        const sf = Soundfont.loadedSoundfonts[soundfontIndex];
        for (let pZone of sf.presets[presetIndex].presetZones) {
            for (let iZone of pZone.instrument.instrumentZones) {
                waves.push(iZone.sampleIndex);
            }
        }
        return waves;
    }

    private static resolveGlobalAndZoneGen(globalGen: Generator | null, zoneGen: Generator): Generator {
        const genDef = this.getGenDef(zoneGen); //assuming theyre the same op
        if (genDef.type == GeneratorCombination.range && globalGen) {
            const globalRange = this.getRangeTypeValues(globalGen.amt);
            const zoneRange = this.getRangeTypeValues(zoneGen.amt);
            const newRange: number[] = [Math.max(globalRange[0], zoneRange[0]), Math.min(globalRange[1], zoneRange[1])];
            const returnGen: Generator = {op: globalGen.op, amt: 0};
            this.setRangeTypeValues(returnGen, newRange);
            return returnGen;
        } else {
            return zoneGen;
        }
    }

    private static resolvePresetAndInstGen(presetGen: Generator, instGen: Generator): Generator {
        const genDef = this.getGenDef(presetGen); //assuming theyre the same op
        if (genDef.type == GeneratorCombination.range) {
            const presetRange = this.getRangeTypeValues(presetGen.amt);
            const instRange = this.getRangeTypeValues(instGen.amt);
            const newRange: number[] = [Math.max(presetRange[0], instRange[0]), Math.min(presetRange[1], instRange[1])];
            const returnGen: Generator = {op: presetGen.op, amt: 0};
            this.setRangeTypeValues(returnGen, newRange);
            return returnGen;
        } else if (genDef.type == GeneratorCombination.additive) { 
            return {op: presetGen.op, amt: presetGen.amt + instGen.amt};
        } else { //otherwise it's invalid, so we should just return the instrument generator safely.
            return instGen;
        }
    }

    //For clarity, as I especially dont want to forget what this function returns:
    //PresetGenerators[] is an array of the generators for each presetZone, with global generators included and resolved in each zone.
    //Then, in each presetGenerator, we get the instrumentZoneGenerators, which is the same, but it also resolves instrument and preset generators.
    //We still want them seperate, but having already accounted for everything at each level makes the other code a lot easier to read.
    public static getGeneratorsOfLevelsFromMidiPitch(soundfontIndex: number, presetIndex: number, pitch: number): PresetGenerators[] {
        //generators suck like damn
        const generators: PresetGenerators[] = [];

        const sf = Soundfont.loadedSoundfonts[soundfontIndex];
        const preset = sf.presets[presetIndex];
        
        //Get generators of each type
        const globalPresetGens = new Map<number, number>(); //global preset gens
        preset.globalGens.forEach((gen) => globalPresetGens.set(gen.op, gen.amt));
        for (const pZone of preset.presetZones) {
            if (pitch < Math.max(pZone.minPitch, preset.minPitch) || pitch > Math.min(pZone.maxPitch, preset.maxPitch))
                continue;
            const presetZoneGens = new Map(globalPresetGens);
            const presetGens: Generator[] = [];
            
            //resolve global and zone gens (not all gens just override the global)
            pZone.gens.forEach((gen) => {
                let globalGen: Generator | null = globalPresetGens.has(gen.op) ? {op: gen.op, amt: globalPresetGens.get(gen.op)} : null;
                const resolved = this.resolveGlobalAndZoneGen(globalGen, gen)
                presetZoneGens.set(resolved.op, resolved.amt);
            });
            presetZoneGens.forEach((amt, op) => presetGens.push({op: op, amt: amt}));

            const globalInstGens = new Map<number, number>(); //global inst gens
            const instGens: InstGenerators[] = [];
            const instrument = pZone.instrument;
            instrument.globalGens.forEach((gen) => globalInstGens.set(gen.op, gen.amt));
            for (const iZone of pZone.instrument.instrumentZones) {
                if (pitch < Math.max(iZone.minPitch, instrument.minPitch) || pitch > Math.min(iZone.maxPitch, instrument.maxPitch))
                    continue;
                const iGens: Generator[] = [];
                const instZoneGens = new Map(globalInstGens);

                //resolve global and zone gens
                iZone.gens.forEach((gen) => {
                    let globalGen: Generator | null = globalInstGens.has(gen.op) ? {op: gen.op, amt: globalInstGens.get(gen.op)} : null;
                    const resolved = this.resolveGlobalAndZoneGen(globalGen, gen)
                    instZoneGens.set(resolved.op, resolved.amt);
                });
                instZoneGens.forEach((amt, op) => iGens.push({op: op, amt: amt}));
                
                //resolve preset and inst gens
                presetGens.forEach((gen) => {
                    const genDef = this.getDefFromGenerator(gen);
                    if (!genDef?.instrumentAllowed) return;

                    const instGenIndex: number = iGens.findIndex((g) => gen.op == g.op);
                    if (instGenIndex > -1) {
                        const resolved: Generator = this.resolvePresetAndInstGen(gen, iGens[instGenIndex]);
                        iGens[instGenIndex] = resolved;
                    } else {
                        iGens.push(gen);
                    }
                });

                instGens.push({gens: iGens});
            }
            if (instGens.length > 0)
                generators.push({gens: presetGens, instGenerators: instGens});
        }

        return generators;
    }

    public static getDefFromGenerator(gen: Generator): GeneratorDef | null {
        for (const gDef in GENERATORS) {
            if (GENERATORS[gDef].op == gen.op)
                return GENERATORS[gDef];
        }
        return null;
    }

    public static getGenAmtFromOp(genList: InstGenerators | PresetGenerators, op: number): number | null {
        const gens = genList.gens;
        const foundGen = gens.find(gen => gen.op === op);
        const genDef = Object.values(GENERATORS).find(def => def.op === op);
        return foundGen?.amt ?? genDef?.defaultValue ?? null;
    }

    constructor(name: string, presets: Preset[], chipWaves: Float32Array[], rawChipWaves: Float32Array[], rawRawChipWaves: Float32Array[], sampleInfo: SampleInfo[], url: string, success: boolean) {
        this.name = name;
        this.presets = presets;
        this.chipWaves = chipWaves;
        this.rawChipWaves = rawChipWaves;
        this.rawRawChipWaves = rawRawChipWaves;
        this.sampleInfo = sampleInfo;
        this.url = url;
        this.success = true
    }
}

// Borrowed from Config. TODO: idk but stop repeating code
function centerWave(wave: Float32Array): Float32Array {
    let sum: number = 0.0;
    for (let i: number = 0; i < wave.length; i++) sum += wave[i];
    const average: number = sum / wave.length;
    for (let i: number = 0; i < wave.length; i++) wave[i] -= average;
    performIntegral(wave);
    // The first sample should be zero, and we'll duplicate it at the end for easier interpolation.
    const result = new Float32Array(wave.length + 1);
    result.set(wave);
    result[wave.length] = 0;
    return result;
}