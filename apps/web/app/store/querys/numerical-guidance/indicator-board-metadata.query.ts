import useSWR from 'swr';
import { API_PATH } from '../api-path';
import { defaultFetcher, deleteFetcher, patchFetcher, postFetcher } from '../fetcher';
import useSWRMutation from 'swr/mutation';
import { IndicatorType } from '../../stores/numerical-guidance/indicator-list.store';
import useSWRImmutable from 'swr/immutable';

export type IndicatorInfoResponse = {
  id: string;
  name: string;
  symbol: string;
  exchange: string;
  indicatorType: IndicatorType;
};

export type IndicatorBoardMetadataResponse = {
  id: string;
  indicatorBoardMetadataName: string;
  indicatorInfos: IndicatorInfoResponse[];
  customForecastIndicatorIds: string[];
  sections: {
    [sectionId: string]: string[];
  };
  updatedAt: string;
};

export type CreateIndicatorMetadataRequestBody = {
  indicatorBoardMetadataName: string;
};

export type CreateIndicatorMetadataResponse = string;

export type AddIndicatorToMetadataRequestBody = {
  indicatorId: string;
  indicatorType: IndicatorType;
};

export const useFetchIndicatorBoardMetadataList = () =>
  useSWRImmutable<IndicatorBoardMetadataResponse[]>(API_PATH.indicatorBoardMetadata, defaultFetcher);

export const useCreateIndicatorMetadata = () =>
  useSWRMutation(
    API_PATH.indicatorBoardMetadata,
    postFetcher<CreateIndicatorMetadataRequestBody, CreateIndicatorMetadataResponse>,
  );

export const useAddIndicatorToMetadata = (metadataId: string | undefined) =>
  useSWRMutation(
    API_PATH.indicatorBoardMetadata,
    async (url: string, { arg }: { arg: AddIndicatorToMetadataRequestBody }) => {
      if (!metadataId) return;
      await postFetcher<AddIndicatorToMetadataRequestBody>([url, metadataId], {
        arg,
      });
    },
  );

export type AddCustomForecastIndicatorToMetadataRequestBody = {
  customForecastIndicatorId: string;
};

export const useAddCustomForecastIndicatorToMetadata = (metadataId: string | undefined) =>
  useSWRMutation(
    API_PATH.indicatorBoardMetadata,
    async (key: string, { arg }: { arg: AddCustomForecastIndicatorToMetadataRequestBody }) => {
      if (!metadataId) return;

      const url = `${key}/custom-forecast-indicator`;
      await postFetcher<AddCustomForecastIndicatorToMetadataRequestBody>([url, metadataId], {
        arg,
      });
    },
  );

type DeleteIndicatorFromMetadataRequestArg = {
  indicatorId: string;
};

export const useDeleteIndicatorFromMetadata = (metadataId: string | undefined) =>
  useSWRMutation(
    API_PATH.indicatorBoardMetadata,
    async (url, { arg }: { arg: DeleteIndicatorFromMetadataRequestArg }) => {
      if (!metadataId) return;
      await deleteFetcher([url, metadataId, 'indicator', arg.indicatorId]);
    },
  );

type DeleteCustomForecastIndicatorFromMetadataRequestArg = {
  customForecastIndicatorId: string;
};

export const useDeleteCustomForecastIndicatorFromMetadata = (metadataId: string | undefined) =>
  useSWRMutation(
    API_PATH.indicatorBoardMetadata,
    async (url, { arg }: { arg: DeleteCustomForecastIndicatorFromMetadataRequestArg }) => {
      if (!metadataId) return;
      await deleteFetcher([url, metadataId, 'custom-forecast-indicator', arg.customForecastIndicatorId]);
    },
  );

export type UpdateIndicatorBoardMetadataRequestBody = {
  name: string;
};

export const useUpdateIndicatorBoardMetadata = (metadataId: string | undefined) => {
  return useSWRMutation(
    API_PATH.indicatorBoardMetadata,
    async (url: string, { arg }: { arg: UpdateIndicatorBoardMetadataRequestBody }) => {
      if (!metadataId) return;
      await patchFetcher<UpdateIndicatorBoardMetadataRequestBody>([url, metadataId], { arg });
    },
  );
};

export const useDeleteIndicatorBoardMetadata = () => {
  return useSWRMutation(API_PATH.indicatorBoardMetadata, async (url, { arg: metadataId }: { arg: string }) => {
    await deleteFetcher([url, metadataId]);
  });
};

export type UpdateIndicatorBoardMetadataSectionsRequestBody = {
  sections: {
    [sectionId: string]: string[];
  };
};

export const useUpdateIndicatorIdsWithsectionIds = (metadataId: string | undefined) => {
  return useSWRMutation(
    API_PATH.indicatorBoardMetadata,
    async (
      url,
      {
        arg,
      }: {
        arg: UpdateIndicatorBoardMetadataSectionsRequestBody;
      },
    ) => {
      if (!metadataId) return;
      await patchFetcher<UpdateIndicatorBoardMetadataSectionsRequestBody>([url, metadataId, 'sections'], { arg });
    },
  );
};

export type UploadIndicatorBoardMetadataImageResponse = string;

export const useUploadIndicatorBoardMetadataImage = () => {
  return useSWRMutation(API_PATH.indicatorBoardMetadata, async (url: string, { arg }: { arg: FormData }) => {
    return await postFetcher<FormData, UploadIndicatorBoardMetadataImageResponse>(
      [url, 'file', 'upload'],
      { arg },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  });
};
