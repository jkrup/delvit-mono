import { fromBase64 } from "@cosmjs/encoding";
import { Secp256k1, Secp256k1Signature, sha256 } from "@cosmjs/crypto";
import { serializeSignDoc} from "@cosmjs/amino";
import type { StdSignDoc } from "@cosmjs/amino"

export const verify = async (signature : { signature: string }, signed: StdSignDoc, pubKey: Uint8Array) => {
  const valid = await Secp256k1.verifySignature(
    Secp256k1Signature.fromFixedLength(fromBase64(signature.signature)),
    sha256(serializeSignDoc(signed)),
    pubKey)
    return valid;
}
