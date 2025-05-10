'use client';
import * as React from 'react';
import { Crud, DataSourceCache } from '@toolpad/core/Crud';
import { PageContainer } from '@toolpad/core/PageContainer';
import { User } from 'next-auth';
import { librariansDataSource } from '@/lib/dataSources/librarians';

export default function StudentsPage() {
    const userCache = new DataSourceCache();

    return (
        <PageContainer title='Sinh viên'>
            <Crud<User>
                dataSource={librariansDataSource}
                dataSourceCache={userCache}
                rootPath="/students"
                initialPageSize={2}
            />
        </PageContainer>
    );
}
