/*
 *Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features*
 */
import {
  NftmanagerContract_Approval_loader,
  NftmanagerContract_Approval_handler,
  NftmanagerContract_ApprovalForAll_loader,
  NftmanagerContract_ApprovalForAll_handler,
  NftmanagerContract_Collect_loader,
  NftmanagerContract_Collect_handler,
  NftmanagerContract_DecreaseLiquidity_loader,
  NftmanagerContract_DecreaseLiquidity_handler,
  NftmanagerContract_IncreaseLiquidity_loader,
  NftmanagerContract_IncreaseLiquidity_handler,
  NftmanagerContract_Transfer_loader,
  NftmanagerContract_Transfer_handler,
  CoreFactoryContract_PoolCreated_loader,
  CoreFactoryContract_PoolCreated_handler,
  PoolContract_Burn_loader,
  PoolContract_Burn_handler,
  PoolContract_Collect_loader,
  PoolContract_Collect_handler,
  PoolContract_CollectProtocol_loader,
  PoolContract_CollectProtocol_handler,
  PoolContract_Flash_loader,
  PoolContract_Flash_handler,
  PoolContract_IncreaseObservationCardinalityNext_loader,
  PoolContract_IncreaseObservationCardinalityNext_handler,
  PoolContract_Initialize_loader,
  PoolContract_Initialize_handler,
  PoolContract_Mint_loader,
  PoolContract_Mint_handler,
  PoolContract_SetFeeProtocol_loader,
  PoolContract_SetFeeProtocol_handler,
  PoolContract_SetLmPoolEvent_loader,
  PoolContract_SetLmPoolEvent_handler,
  PoolContract_Swap_loader,
  PoolContract_Swap_handler,
  
} from "../generated/src/Handlers.gen";

import {
  ApprovalEntity,
  ApprovalForAllEntity,
  CollectEntity,
  DecreaseLiquidityEntity,
  IncreaseLiquidityEntity,
  TransferEntity,
  EventsSummaryEntity,
  TokenBalanceEntity,
  PoolCreatedEntity,
  BurnEntity,
  PoolEntity,
  CollectProtocolEntity,
  FlashEntity,
  IncreaseObservationCardinalityNextEntity,
  InitializeEntity,
  MintEntity,
  SetFeeProtocolEntity,
  SetLmPoolEventEntity,
  SwapEntity, 
  DailySwapSummaryEntity,
 
 
 
} from "./src/Types.gen";

const GLOBAL_EVENTS_SUMMARY_KEY = "GlobalEventsSummary";

const INITIAL_EVENTS_SUMMARY: EventsSummaryEntity = {
  id: GLOBAL_EVENTS_SUMMARY_KEY,
  approvalsCount: BigInt(0),
  approvalForAllsCount: BigInt(0),
  collectsCount: BigInt(0),
  decreaseLiquiditysCount: BigInt(0),
  increaseLiquiditysCount: BigInt(0),
  transfersCount: BigInt(0),
  burnsCount: BigInt(0),
  collectProtocolsCount: BigInt(0),
  flashsCount: BigInt(0),
  increaseObservationCardinalityNextsCount: BigInt(0),
  initializesCount: BigInt(0),
  mintsCount: BigInt(0),
  setFeeProtocolsCount: BigInt(0),
  setLmPoolEventsCount: BigInt(0),
  swapsCount: BigInt(0),
  poolCreatedsCount: BigInt(0),
  feeAmountEnabledsCount: BigInt(0),
  feeAmountExtraInfoUpdatedsCount: BigInt(0),
  ownerChangedsCount: BigInt(0),
  whiteListAddedsCount: BigInt(0),
  totalSwapCount: BigInt(0)
};

CoreFactoryContract_PoolCreated_loader(({ event, context }) => {
 
  context.contractRegistration.addPool(event.params.pool)


});

CoreFactoryContract_PoolCreated_handler(({ event, context }) => {
  

  let currentSummaryEntity: EventsSummaryEntity =
    INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    poolCreatedsCount: currentSummaryEntity.poolCreatedsCount + BigInt(1),
  };

  let poolCreatedEntity: PoolCreatedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    token0: event.params.token0,
    token1: event.params.token1,
    fee: event.params.fee,
    tickSpacing: event.params.tickSpacing,
    pool: event.params.pool,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.PoolCreated.set(poolCreatedEntity);
});


PoolContract_Burn_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

PoolContract_Burn_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    burnsCount: currentSummaryEntity.burnsCount + BigInt(1),
  };

  let burnEntity: BurnEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    owner: event.params.owner,
    tickLower: event.params.tickLower,
    tickUpper: event.params.tickUpper,
    amount: event.params.amount,
    amount0: event.params.amount0,
    amount1: event.params.amount1,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Burn.set(burnEntity);
});



PoolContract_CollectProtocol_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

PoolContract_CollectProtocol_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    collectProtocolsCount: currentSummaryEntity.collectProtocolsCount + BigInt(1),
  };

  let collectProtocolEntity: CollectProtocolEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    sender: event.params.sender,
    recipient: event.params.recipient,
    amount0: event.params.amount0,
    amount1: event.params.amount1,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.CollectProtocol.set(collectProtocolEntity);
});

PoolContract_Flash_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

PoolContract_Flash_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    flashsCount: currentSummaryEntity.flashsCount + BigInt(1),
  };

  let flashEntity: FlashEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    sender: event.params.sender,
    recipient: event.params.recipient,
    amount0: event.params.amount0,
    amount1: event.params.amount1,
    paid0: event.params.paid0,
    paid1: event.params.paid1,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Flash.set(flashEntity);
});

PoolContract_IncreaseObservationCardinalityNext_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

PoolContract_IncreaseObservationCardinalityNext_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    increaseObservationCardinalityNextsCount: currentSummaryEntity.increaseObservationCardinalityNextsCount + BigInt(1),
  };

  let increaseObservationCardinalityNextEntity: IncreaseObservationCardinalityNextEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    observationCardinalityNextOld: event.params.observationCardinalityNextOld,
    observationCardinalityNextNew: event.params.observationCardinalityNextNew,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.IncreaseObservationCardinalityNext.set(increaseObservationCardinalityNextEntity);
});

PoolContract_Initialize_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

PoolContract_Initialize_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    initializesCount: currentSummaryEntity.initializesCount + BigInt(1),
  };

  let initializeEntity: InitializeEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    sqrtPriceX96: event.params.sqrtPriceX96,
    tick: event.params.tick,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Initialize.set(initializeEntity);
});

PoolContract_Mint_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

PoolContract_Mint_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    mintsCount: currentSummaryEntity.mintsCount + BigInt(1),
  };

  let mintEntity: MintEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    sender: event.params.sender,
    owner: event.params.owner,
    tickLower: event.params.tickLower,
    tickUpper: event.params.tickUpper,
    amount: event.params.amount,
    amount0: event.params.amount0,
    amount1: event.params.amount1,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Mint.set(mintEntity);
});

PoolContract_SetFeeProtocol_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

PoolContract_SetFeeProtocol_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    setFeeProtocolsCount: currentSummaryEntity.setFeeProtocolsCount + BigInt(1),
  };

  let setFeeProtocolEntity: SetFeeProtocolEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    feeProtocol0Old: event.params.feeProtocol0Old,
    feeProtocol1Old: event.params.feeProtocol1Old,
    feeProtocol0New: event.params.feeProtocol0New,
    feeProtocol1New: event.params.feeProtocol1New,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.SetFeeProtocol.set(setFeeProtocolEntity);
});

PoolContract_SetLmPoolEvent_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

PoolContract_SetLmPoolEvent_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    setLmPoolEventsCount: currentSummaryEntity.setLmPoolEventsCount + BigInt(1),
  };

  let setLmPoolEventEntity: SetLmPoolEventEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    addr: event.params.addr,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.SetLmPoolEvent.set(setLmPoolEventEntity);
});

PoolContract_Swap_loader(({ event, context }) => {
  context.DailySwapSummary.load(event.srcAddress.toString());
});

PoolContract_Swap_handler(({ event, context }) => {
 
  let swapEntity: SwapEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    sender: event.params.sender,
    recipient: event.params.recipient,
    amount0: event.params.amount0,
    amount1: event.params.amount1,
    sqrtPriceX96: event.params.sqrtPriceX96,
    liquidity: event.params.liquidity,
    tick: event.params.tick,
    protocolFeesToken0: event.params.protocolFeesToken0,
    protocolFeesToken1: event.params.protocolFeesToken1,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
    cumulativeVolumeByTokenAmount: [event.params.amount0,
      event.params.amount1]
  };
  let dailySwapSummary = context.DailySwapSummary.get(Date());
    if (!dailySwapSummary) {
      dailySwapSummary = {  
        id: event.srcAddress.toString(), 
        date: Date(),     
        cumulativeValue: BigInt(0),     
        totalSwapAmount: BigInt(0),
        totalSwapCount: 0,
      };
      context.DailySwapSummary.set(dailySwapSummary);
    }
    else{
  let amount0 = event.params.amount0;
  let amount1 = event.params.amount1;
        let cumValue = dailySwapSummary.cumulativeValue
  let totalSwapAmount = dailySwapSummary.totalSwapAmount
  let totalSwapCount = dailySwapSummary.totalSwapCount
      dailySwapSummary = {
            id: event.srcAddress.toString(), 
            cumulativeValue: cumValue += BigInt(amount0 + amount1),
            date: Date(), 
            totalSwapAmount: totalSwapAmount += BigInt(amount0 + amount1),
            totalSwapCount: totalSwapCount += 1,
          };
          context.DailySwapSummary.set(dailySwapSummary);
    }


  context.Swap.set(swapEntity);
});


// PoolContract_Swap_loader(({ event, context }) => {
//   context.TokenSwapBalance.load(event.params.sender);
//   context.TokenSwapBalance.load(event.params.recipient);


// });
// PoolContract_Swap_handler(({ event, context }) => {
//   // Handling the Swap event

//   const date = new Date().toISOString().split('T')[0];

//   // Load or create the DailySwapSummaryEntity for the current date
//   let dailySwapSummary = context.DailySwapSummary.get(date);
//   if (!dailySwapSummary) {
//     dailySwapSummary = {
//       id: date,
//       cumulativeValue: BigInt(0),
//       date: date,
//       totalSwapAmount: BigInt(0),
//       totalSwapCount: 0,
//     };
//   }
//   let sender = event.params.sender;
//   let recipient = event.params.recipient;
  
//   let amount0 = event.params.amount0;
//   let amount1 = event.params.amount1;
//   // Update cumulative values and counts
//   let cumValue = dailySwapSummary.cumulativeValue
//   let totalSwapAmount = dailySwapSummary.totalSwapAmount
//   let totalSwapCount = dailySwapSummary.totalSwapCount

//   dailySwapSummary = {
//     id: date,
//     cumulativeValue: cumValue += BigInt(amount0 + amount1),
//     date: date,
//     totalSwapAmount: totalSwapAmount += BigInt(amount0 + amount1),
//     totalSwapCount: totalSwapCount += 1,
//   };


//   // Save the updated DailySwapSummaryEntity
//   context.DailySwapSummary.set(dailySwapSummary);


//   // Load existing TokenBalance entities for sender and recipient
//   let senderBalance = context.TokenSwapBalance.get(sender);
//   let recipientBalance = context.TokenSwapBalance.get(recipient);
  
//   // Load the Pool entity


// });




NftmanagerContract_Approval_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

NftmanagerContract_Approval_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    approvalsCount: currentSummaryEntity.approvalsCount + BigInt(1),
  };

  let approvalEntity: ApprovalEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    owner: event.params.owner,
    approved: event.params.approved,
    tokenId: event.params.tokenId,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Approval.set(approvalEntity);
});

NftmanagerContract_ApprovalForAll_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

NftmanagerContract_ApprovalForAll_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    approvalForAllsCount: currentSummaryEntity.approvalForAllsCount + BigInt(1),
  };

  let approvalForAllEntity: ApprovalForAllEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    owner: event.params.owner,
    operator: event.params.operator,
    approved: event.params.approved,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.ApprovalForAll.set(approvalForAllEntity);
});

// Loader function for ERC-20 Transfer event


NftmanagerContract_Collect_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

NftmanagerContract_Collect_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    collectsCount: currentSummaryEntity.collectsCount + BigInt(1),
  };

  let collectEntity: CollectEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    tokenId: event.params.tokenId,
    recipient: event.params.recipient,
    amount0: event.params.amount0,
    amount1: event.params.amount1,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Collect.set(collectEntity);
});

NftmanagerContract_DecreaseLiquidity_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

NftmanagerContract_DecreaseLiquidity_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    decreaseLiquiditysCount: currentSummaryEntity.decreaseLiquiditysCount + BigInt(1),
  };

  let decreaseLiquidityEntity: DecreaseLiquidityEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    tokenId: event.params.tokenId,
    liquidity: event.params.liquidity,
    amount0: event.params.amount0,
    amount1: event.params.amount1,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.DecreaseLiquidity.set(decreaseLiquidityEntity);
});

NftmanagerContract_IncreaseLiquidity_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

NftmanagerContract_IncreaseLiquidity_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    increaseLiquiditysCount: currentSummaryEntity.increaseLiquiditysCount + BigInt(1),
  };

  let increaseLiquidityEntity: IncreaseLiquidityEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    tokenId: event.params.tokenId,
    liquidity: event.params.liquidity,
    amount0: event.params.amount0,
    amount1: event.params.amount1,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.IncreaseLiquidity.set(increaseLiquidityEntity);
});
// Loader function for ERC-20 Transfer event
NftmanagerContract_Transfer_loader(({ event, context }) => {
  context.TokenBalance.load(event.params.from);
  context.TokenBalance.load(event.params.to);
});

// Handler for ERC-20 Transfer event
NftmanagerContract_Transfer_handler(({ event, context }) => {
  // Handling transfer FROM
  let fromBalance = context.TokenBalance.get(event.params.from);
  context.TokenBalance.set({
    id: event.params.from,
    address: event.params.from,
    tokenId: event.params.tokenId,
    balance: fromBalance !== undefined ? fromBalance.balance - 1 : 0,
  });

  // Handling transfer TO
  let toBalance = context.TokenBalance.get(event.params.to);
  context.TokenBalance.set({
    id: event.params.to,
    address: event.params.to,
    tokenId: event.params.tokenId,
    balance: toBalance !== undefined ? toBalance.balance + 1 : 1,
  });
});