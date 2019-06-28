import path from 'path';
import fse from 'fs-extra';
import fs from 'fs';

import filesService from 'services/files/files.service';
import { gitPath } from 'config';

const repoName = '__repoXX__';

describe('Files Module', () => {
  it('Should Add a file', async () => {
    const writingPath = await filesService.addFile(repoName, 'text.dat');

    expect(fse.pathExistsSync(writingPath)).toBe(true);
  });

  it('Should Add a Directory', async () => {
    const writingPath = await filesService.addDirectory(repoName, 'directory');

    expect(fse.pathExistsSync(writingPath)).toBe(true);
  });

  it('Should Remove a File', async () => {
    const writingPath = await filesService.removeFile(repoName, 'text.dat');

    expect(fse.pathExistsSync(writingPath)).toBe(false);
  });

  it('Should Remove a Directory', async () => {
    const writingPath = await filesService.removeFile(repoName, 'directory');

    expect(fse.pathExistsSync(writingPath)).toBe(false);
  });

  it('Should Add content to a file', async () => {
    const content = 'this is content';
    const writingPath = await filesService.addContent(repoName, 'text.dat', content);

    expect(fs.readFileSync(writingPath).toString()).toEqual(content);
  });
});

afterAll(() => fse.removeSync(path.join(gitPath, repoName)));