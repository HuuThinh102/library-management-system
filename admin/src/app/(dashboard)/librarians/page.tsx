'use client';
import * as React from 'react';
import { Crud, DataSourceCache } from '@toolpad/core/Crud';
import { PageContainer } from '@toolpad/core/PageContainer';
import { User } from 'next-auth';
import { librariansDataSource } from '@/lib/dataSources/librarians';

export default function LibrariansPage() {
    const userCache = new DataSourceCache();

    return (
        <PageContainer title='Thủ thư'>
            <Crud<User>
                dataSource={librariansDataSource}
                dataSourceCache={userCache}
                rootPath="/librarians"
                initialPageSize={2}
            />
        </PageContainer>
    );
}
