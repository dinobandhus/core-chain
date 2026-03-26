package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"core-chain/core"
)

type RPCRequest struct {
	JSONRPC string        `json:"jsonrpc"`
	Method  string        `json:"method"`
	Params  []interface{} `json:"params"`
	ID      int           `json:"id"`
}

type RPCResponse struct {
	JSONRPC string      `json:"jsonrpc"`
	ID      int         `json:"id"`
	Result  interface{} `json:"result"`
}

const chainID = "0x7ea"

func handler(w http.ResponseWriter, r *http.Request) {
	var req RPCRequest
	json.NewDecoder(r.Body).Decode(&req)

	var result interface{}

	switch req.Method {

	case "eth_chainId":
		result = chainID

	case "net_version":
		result = "2026"

	case "eth_blockNumber":
		height := core.GetBlockHeight()
		result = fmt.Sprintf("0x%x", height)

	case "eth_getBalance":
		address := req.Params[0].(string)
		balance := core.GetBalance(address)
		result = fmt.Sprintf("0x%x", balance)

	default:
		result = nil
	}

	res := RPCResponse{
		JSONRPC: "2.0",
		ID:      req.ID,
		Result:  result,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(res)
}

func main() {
	http.HandleFunc("/", handler)

	log.Println("🚀 Full Blockchain RPC running on 8545")
	http.ListenAndServe(":8545", nil)
}
