import { PipelineStage } from 'mongoose'

export interface OktusPipelineStage {
  $match?: Record<string, any>
  $sort?: Record<string, any>
  $addFields?: Record<string, any>
  $project?: Record<string, any>
  $skip?: string
  $limit?: string
  $lookup?: Record<string, any>
  $unwind?: Record<string, any>
  count?: any
}

export type GenericAggregationOptions = PipelineStage | OktusPipelineStage
