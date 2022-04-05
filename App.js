import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SecretNetworkClient } from "secretjs";

export default function App() {
    const instantiateSecret = async () => {
      // To create a readonly secret.js client, just pass in a gRPC-web endpoint
      const secretjs = await SecretNetworkClient.create({
        grpcWebUrl: "https://grpc-web.azure-api.net",
        chainId: "secret-4",
      });

      const {
        balance: { amount },
      } = await secretjs.query.bank.balance({
        address: "secret1ap26qrlp8mcq2pg6r47w43l0y8zkqm8a450s03",
        denom: "uscrt",
      });

      console.log(`I have ${Number(amount) / 1e6} SCRT!`);

      const sSCRT = "secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek";
      // Get codeHash using `secretcli q compute contract-hash secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek`
      const sScrtCodeHash =
        "af74387e276be8874f07bec3a87023ee49b0e7ebe08178c49d0a49c3c98ed60e";

      const { token_info } = await secretjs.query.compute.queryContract({
        contractAddress: sSCRT,
        codeHash: sScrtCodeHash, // optional but way faster
        query: { token_info: {} },
      });

      console.log(`sSCRT has ${token_info.decimals} decimals!`);
    }

  return (
    <View style={styles.container}>
      <Text>SecretJS Test Installation</Text>
      <button onClick={instantiateSecret}>Click Me</button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
